import * as types from 'cassandra-driver/lib/types';
const { Uuid } = types as any;

const tmpStringifyDbSingleObject = (obj: unknown) => {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
            if (value instanceof Uuid) {
                return [key, value.toString()];
            } else {
                return [key, value];
            }
        }),
    );
};

/**
 * Converts a database result into a plain JavaScript object or an array of objects,
 * stringifying any Uuid values.
 * @param dbResult - The database result to be converted.
 * @returns The converted plain JavaScript object or array of objects.
 */
export function tmpStringifyDbResult(dbResult: unknown) {
    if (dbResult === null || dbResult === undefined) {
        return null;
    }

    const isArray = Array.isArray(dbResult);
    if (isArray) {
        return (dbResult as any[]).map(tmpStringifyDbSingleObject);
    } else {
        return tmpStringifyDbSingleObject(dbResult);
    }
}
