type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type Filter<KeyType, ExcludeType> =
    IsEqual<KeyType, ExcludeType> extends true
        ? never
        : KeyType extends ExcludeType
          ? never
          : KeyType;

export type IsEqual<T, U> =
    (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2 ? true : false;

export type Except<ObjectType, KeysType extends keyof ObjectType> = {
    [KeyType in keyof ObjectType as Filter<KeyType, KeysType>]: ObjectType[KeyType];
};

export type SetRequired<BaseType, Keys extends keyof BaseType> = Simplify<
    Except<BaseType, Keys> & Required<Pick<BaseType, Keys>>
>;
