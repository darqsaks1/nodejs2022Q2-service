export class InMemoryStore {
    authUsers = []
    jwt = ''
    private static instance
    constructor() {
        if (!InMemoryStore.instance) {
            InMemoryStore.instance = this
        }

        return InMemoryStore.instance
    }
}