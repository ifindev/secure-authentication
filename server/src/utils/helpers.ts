export function omitPassword<T extends { password?: string }>(data: T): Omit<T, 'password'> {
    const { password, ...userWithoutPassword } = data;
    return userWithoutPassword;
}
