import { useMutation, useQuery } from '@vue/apollo-composable';
import { store } from '@/util/store';
import type { ApolloError } from '@apollo/client/errors';
import type { DocumentNode } from 'graphql/language';

const codes_warning = [
  "CONFLICT",
  "UNAUTHORIZED",
  "FORBIDDEN",
  "NOT_FOUND",
  "UNAUTHENTICATED"
]

const options = {
  context: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("barrier_token")}`,
      Accept_Language: localStorage.getItem("lang")
    }
  }
}

function on_error(e: ApolloError) {
  const error_code = e.graphQLErrors[0].extensions.code as string
  if (codes_warning.includes(error_code)) {
    store.show_alert("warning", e.message);
  } else {
    store.show_alert("danger", e.message);
  }
}

export async function query(query: DocumentNode): Promise<any> {
  return new Promise((resolve, reject) => {
    const { onError, onResult } = useQuery(query, null, options);
    onError((e) => {
      on_error(e)
      reject(e);
    });
    onResult((r) => {
      resolve(r.data);
    });
  });
}

export function mutation(mutation: DocumentNode) {
  const { mutate, onError } = useMutation(mutation, options);
  onError(on_error)
  return mutate;
}
