import {NextApiRequest, NextApiResponse} from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    {key: 1, nome: 'Robson'},
    {key: 2, nome: 'Bheren'},
    {key: 3, nome: 'Cheetos'}
  ];

  return response.json(users);
}