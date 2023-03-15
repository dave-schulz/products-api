import { get } from 'lodash';
import { SessionDocument } from './../models/session.model';
import { FilterQuery, UpdateQuery } from 'mongoose';
import SessionModel from '../models/session.model';
import { verifyJwt } from '../utils/jwt.utils';
import { findUser } from './user.service';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>,
) {
  return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: any;
}) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, 'session')) return false;

  const session = await SessionModel.findById(get(decoded, 'session'));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokenTtl') },
  );

  return accessToken;
}
