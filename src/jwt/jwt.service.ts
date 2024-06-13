import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  //* User's methods || Login & Register
  constructor(private jwtService: JwtService) {}

  /**
   * @param user find user from database
   * @returns generated jwt
   */
  //TODO Definir el DTO del usuario
  async generateJwt(user: any): Promise<string> {
    /**
     * @return: user.id, user.nickname
     * @description This params are for navigational permissions inside the API.
     *              Destructuring the token, gets the information.
     */
    const payload = {
      sub: user.id,
      username: user.username,
      name: user.name,
      last_name: user.last_name,
      contractor: user.contractor ? user.contractor.name : '',
    };
    return this.jwtService.signAsync(payload);
  }

  /**
   * @param user find user from database
   * @returns generated jwt
   */
  //TODO Definir el DTO del usuario
  async generateJwtRestorePassword(user: any): Promise<string> {
    /**
     * @return: user.id, user.nickname
     * @description This params are for navigational permissions inside the API.
     *              Destructuring the token, gets the information.
     */
    const payload = {
      sub: user.id,
      pass: user.pass,
    };
    return this.jwtService.signAsync(payload);
  }

  /**
   * @param user find user from database
   * @returns generated jwt
   */
  async generateJwtEvaluation(body: any, seconds: number): Promise<string> {
    /**
     * @return: user.id, user.nickname
     * @description This params are for navigational permissions inside the API.
     *              Destructuring the token, gets the information.
     */
    const payload = {
      body,
    };
    const options: JwtSignOptions = {
      expiresIn: seconds,
    };
    return this.jwtService.signAsync(payload, options);
  }

  /**
   * @param password new user's password
   * @returns hashed password
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  /**
   * @description compares the login password with the stored
   * @param password input password
   * @param hashPassword stored user's password
   * @returns boolean
   */
  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }

  /**
   * @description compare user session jwt
   * @param jwt jwt from client
   * @returns boolean
   */
  async verifyJwt(jwt: string): Promise<any> {
    return await this.jwtService.verifyAsync(jwt);
  }

  /**
   *
   * @param token token to compare
   * @returns if token = token.type, return true, else false
   */
  isJwt(token: string): boolean {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }

    try {
      const header = JSON.parse(
        Buffer.from(parts[0], 'base64').toString('utf-8'),
      );
      return !!header;
    } catch (error) {
      return false;
    }
  }
}
