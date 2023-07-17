export class DCMIdentifiers {
    static readonly userRepository = Symbol.for("userRepository");
    static readonly passwordGateway = Symbol.for("passwordGateway");
    static readonly plotRepository = Symbol.for("plotRepository");
    static readonly eventCultureRepository = Symbol.for("eventCultureRepository");
}