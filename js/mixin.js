export default (from, to) => {
    Reflect.ownKeys(from).forEach(propertyName => Reflect.defineProperty(to, propertyName, Reflect.getOwnPropertyDescriptor(from, propertyName)));
};
