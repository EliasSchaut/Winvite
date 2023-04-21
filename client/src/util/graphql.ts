import { useMutation, useQuery } from '@vue/apollo-composable';
import { store } from '@/util/store';
import type { ApolloError } from '@apollo/client/errors';
import type { DocumentNode } from 'graphql/language';
import gql from 'graphql-tag';

const codes_warning = [
  'CONFLICT',
  'UNAUTHORIZED',
  'FORBIDDEN',
  'NOT_FOUND',
  'UNAUTHENTICATED'
];

function on_error(e: ApolloError) {
  const error_code = e.graphQLErrors[0].extensions.code as string;
  if (codes_warning.includes(error_code)) {
    store.show_alert('warning', e.message);
  } else {
    store.show_alert('danger', e.message);
  }
}

export async function query(query: DocumentNode): Promise<any> {
  return new Promise((resolve, reject) => {
    const { onError, onResult } = useQuery(query, null, {
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('barrier_token')}`,
          Accept_Language: localStorage.getItem('lang')
        }
      },
      fetchPolicy: 'network-only'
    });
    onError((e) => {
      on_error(e);
      reject(e);
    });
    onResult((r) => {
      resolve(r.data);
    });
  })
    ;
}

export function mutation(mutation: DocumentNode) {
  const { mutate, onError } = useMutation(mutation, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('barrier_token')}`,
        Accept_Language: localStorage.getItem('lang')
      }
    },
    fetchPolicy: 'network-only'
  });
  onError(on_error);
  return mutate;
}

export async function log_in(challenge: string) {
  const data = await query(gql`
        query sign_in {
          sign_in(challenge: "${challenge}") {
            barrier_token
          }
        }
      `);
  if (data.sign_in.barrier_token !== null) {
    localStorage.setItem('barrier_token', data.sign_in.barrier_token);
    store.logged_in = true;
    return true;
  }

  return false;
}

export function log_out() {
  localStorage.removeItem('barrier_token');
  store.logged_in = false;
}