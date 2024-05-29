import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {Getter, inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  HttpErrors,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {securityId} from '@loopback/security/dist/types';
import _ from 'lodash';
import {Permission} from '../authorization/permissons.enum';
import {PasswordBindings} from '../keys';
import {Auth, Login} from '../models';
import {AuthRepository} from '../repositories';
import {BcryptHash} from '../services/hash.bcrypt';
import {JWTService} from '../services/jwt.service';
import {authService} from '../services/user.service';
import {validateCredentials} from '../services/validator';
import {Crdentials, MyUserProfile} from '../types';

export interface Address {
  street: 'string';
  city: 'string';
  district: 'string';
  state: 'string';
  pincode: 'string';
}

export class AuthController {
  constructor(
    @repository(AuthRepository)
    public authRepository: AuthRepository,
    @inject(PasswordBindings.passwordHash)
    public hasher: BcryptHash,
    @inject('Services.user.service')
    public userService: authService,
    @inject('Services.jwt.service')
    public jwtService: JWTService,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    public getCurrentUser: Getter<MyUserProfile>,
  ) {}

  @post('/signUp')
  @response(200, {
    description: 'Auth model instance',
    content: {'application/json': {schema: getModelSchemaRef(Auth)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Auth, {
            title: 'NewAuth',
            exclude: ['id', 'permissions', 'fssaiId', 'GSTno', 'companyName'],
          }),
        },
      },
    })
    auth: Omit<Auth, 'id'>,
  ): Promise<any> {
    try {
      validateCredentials(_.pick(auth, ['userName', 'password']));
      auth.permissions = [Permission.USER];
      auth.password = await this.hasher.hashPassWord(auth.password);
      const {password, ...user} = await this.authRepository.create(auth);
      return {message: 'user created successfully'};
    } catch (err) {
      if (err.code === 11000) {
        throw new HttpErrors.Conflict('Duplicate key error');
      }
      throw Error(err);
    }
  }

  @post('/login')
  @response(200, {
    description: 'token',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody({
      description: 'the input of login function',
      required: true,
      content: {
        'application/json': {schema: getModelSchemaRef(Login)},
      },
    })
    credentials: Crdentials,
  ): Promise<{token: string}> {
    const user = await this.userService.verifyCredentials(credentials);

    const userProfile = this.userService.convertToUserProfile(user);

    const token = await this.jwtService.generateToken(userProfile);
    return Promise.resolve({token});
  }

  @post('/createAdmin')
  @response(200, {
    description: 'Auth model instance',
    content: {'application/json': {schema: getModelSchemaRef(Auth)}},
  })
  async createAdmin(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Auth, {
            title: 'NewAuth',
            exclude: ['id'],
          }),
        },
      },
    })
    auth: Omit<Auth, 'id'>,
  ): Promise<object> {
    validateCredentials(_.pick(auth, ['userName', 'password']));
    auth.permissions = [Permission.USER, Permission.ADMIN];
    auth.password = await this.hasher.hashPassWord(auth.password);
    const user = this.authRepository.create(auth);
    return {message: 'admin created successfully'};
  }

  // @get('/auths/count')
  // @response(200, {
  //   description: 'Auth model count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async count(
  //   @param.where(Auth) where?: Where<Auth>,
  // ): Promise<Count> {
  //   return this.authRepository.count(where);
  // }

  @get('/user')
  @response(200, {
    description: 'Array of Auth model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Auth, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate({
    strategy: 'jwt',
    options: {required: [Permission.USER]},
  })
  async find(): Promise<any> {
    const user = await this.getCurrentUser();
    return this.authRepository.findById(user[securityId]);
  }

  @put('/user')
  @response(200, {
    description: 'Array of Auth model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Auth, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate({
    strategy: 'jwt',
    options: {required: [Permission.USER]},
  })
  async update(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Auth),
        },
      },
    })
    auth: Auth,
  ): Promise<any> {
    const user = await this.getCurrentUser();
    this.authRepository.updateById(user[securityId], auth);
    return {message: 'updated successfully'};
  }

  // @patch('/auths')
  // @response(200, {
  //   description: 'Auth PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Auth, {partial: true}),
  //       },
  //     },
  //   })
  //   auth: Auth,
  //   @param.where(Auth) where?: Where<Auth>,
  // ): Promise<Count> {
  //   return this.authRepository.updateAll(auth, where);
  // }

  // @get('/auths/{id}')
  // @response(200, {
  //   description: 'Auth model instance',
  //   content: {
  //     'application/json': {
  //       schema: getModelSchemaRef(Auth, {includeRelations: true}),
  //     },
  //   },
  // })
  // async findById(
  //   @param.path.string('id') id: string,
  //   @param.filter(Auth, {exclude: 'where'}) filter?: FilterExcludingWhere<Auth>
  // ): Promise<Auth> {
  //   return this.authRepository.findById(id, filter);
  // }

  // @patch('/auths/{id}')
  // @response(204, {
  //   description: 'Auth PATCH success',
  // })
  // async updateById(
  //   @param.path.string('id') id: string,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Auth, {partial: true}),
  //       },
  //     },
  //   })
  //   auth: Auth,
  // ): Promise<void> {
  //   await this.authRepository.updateById(id, auth);
  // }

  //   @put('/auths/{id}')
  //   @response(204, {
  //     description: 'Auth PUT success',
  //   })
  //   async replaceById(
  //     @param.path.string('id') id: string,
  //     @requestBody() auth: Auth,
  //   ): Promise<void> {
  //     await this.authRepository.replaceById(id, auth);
  //   }

  //   @del('/auths/{id}')
  //   @response(204, {
  //     description: 'Auth DELETE success',
  //   })
  //   async deleteById(@param.path.string('id') id: string): Promise<void> {
  //     await this.authRepository.deleteById(id);
  //   }
}
