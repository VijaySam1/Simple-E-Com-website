// ---------- ADD IMPORTS -------------
import {
  AuthenticateFn,
  AuthenticationBindings,
  AUTHENTICATION_STRATEGY_NOT_FOUND,
  USER_PROFILE_NOT_FOUND,
} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  FindRoute,
  InvokeMethod,
  LogError,
  ParseParams,
  Reject,
  RequestContext,
  Send,
  SequenceActions,
  SequenceHandler,
} from '@loopback/rest';
import cors from 'cors';
import {ErrorInterceptor} from './interceptors/normal.interceptor';
// ------------------------------------
export class MySequence implements SequenceHandler {
  constructor(
    // ---- ADD THIS LINE ------
    @inject(SequenceActions.FIND_ROUTE)
    protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS)
    protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD)
    protected invoke: InvokeMethod,

    @inject(SequenceActions.SEND)
    protected send: Send,
    @inject(SequenceActions.REJECT)
    protected reject: Reject,
    @inject(AuthenticationBindings.AUTH_ACTION)
    protected authenticateRequest: AuthenticateFn,
    @inject(SequenceActions.LOG_ERROR)
    protected logError: LogError,
    @inject('ErrorInterceptor')
    protected customErrorInterceptor: ErrorInterceptor,
  ) {}
  async handle(context: RequestContext) {
    try {
      const {request, response} = context;
      const route = this.findRoute(request);
      // - enable jwt auth -
      // call authentication action
      // ---------- ADD THIS LINE -------------
      const corsOptions = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
      };
      const corsMiddleware = cors(corsOptions);
      await new Promise<void>((resolve, reject) => {
        corsMiddleware(request, response, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      await this.authenticateRequest(request);
      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (err) {
      // ---------- ADD THIS SNIPPET -------------
      // if error is coming from the JWT authentication extension
      // make the statusCode 401
      if (
        err.code === AUTHENTICATION_STRATEGY_NOT_FOUND ||
        err.code === USER_PROFILE_NOT_FOUND
      ) {
        Object.assign(err, {statusCode: 401 /* Unauthorized */});
      }
      // ---------- END OF SNIPPET -------------
      this.reject(context, err);
    }
  }
}
