export function logger(store) {
  store.subscribe((mutation, state) => {
    console.log('Mutation', mutation.type, 'called with', mutation.payload);
    console.log('Current state:', Object.assign({}, state));
  });

  store.subscribeAction({
    before(action, state) {
      console.log('before:', action.type, Object.assign({}, state));
    },
    after(action, state) {
      console.log('after:', action.type, Object.assign({}, state));
    },
  });
};
