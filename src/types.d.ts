export interface ErrorCustom extends Error {
    code?: string;
}

export type dependencies = Record<string, pkgInfo>;
export interface pkgInfo {
    version: string;
    resolved: string;
    overridden?: boolean;
    invalid?: string;
    dependencies?: dependencies;
}

export type rootPkgInfo = {
    version: string,
    name: string,
    dependencies?: dependencies;
}

export type pkg = {
    name: string,
    version: string
}
