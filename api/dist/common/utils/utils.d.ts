/// <reference types="node" />
/// <reference types="node" />
export declare const toPromise: <T>(data: T) => Promise<T>;
export declare const getDbConnectionOptions: (connectionName?: string) => Promise<{
    name: string;
    type: "mysql" | "mariadb";
    driver?: any;
    charset?: string;
    timezone?: string;
    connectTimeout?: number;
    acquireTimeout?: number;
    insecureAuth?: boolean;
    supportBigNumbers?: boolean;
    bigNumberStrings?: boolean;
    dateStrings?: boolean | string[];
    debug?: boolean | string[];
    trace?: boolean;
    multipleStatements?: boolean;
    legacySpatialSupport?: boolean;
    flags?: string[];
    connectorPackage?: "mysql" | "mysql2";
    replication?: {
        readonly master: import("typeorm/driver/mysql/MysqlConnectionCredentialsOptions").MysqlConnectionCredentialsOptions;
        readonly slaves: import("typeorm/driver/mysql/MysqlConnectionCredentialsOptions").MysqlConnectionCredentialsOptions[];
        readonly canRetry?: boolean;
        readonly removeNodeErrorCount?: number;
        readonly restoreNodeTimeout?: number;
        readonly selector?: "RR" | "RANDOM" | "ORDER";
    };
    entities?: import("typeorm").MixedList<string | Function | import("typeorm").EntitySchema<any>>;
    subscribers?: import("typeorm").MixedList<string | Function>;
    migrations?: import("typeorm").MixedList<string | Function>;
    migrationsTableName?: string;
    migrationsTransactionMode?: "all" | "none" | "each";
    metadataTableName?: string;
    namingStrategy?: import("typeorm").NamingStrategyInterface;
    logging?: import("typeorm").LoggerOptions;
    logger?: "file" | "debug" | "advanced-console" | "simple-console" | import("typeorm").Logger;
    maxQueryExecutionTime?: number;
    poolSize?: number;
    synchronize?: boolean;
    migrationsRun?: boolean;
    dropSchema?: boolean;
    entityPrefix?: string;
    entitySkipConstructor?: boolean;
    extra?: any;
    relationLoadStrategy?: "join" | "query";
    typename?: string;
    cache?: boolean | {
        readonly type?: "database" | "redis" | "ioredis" | "ioredis/cluster";
        readonly provider?: (connection: import("typeorm").DataSource) => import("typeorm/cache/QueryResultCache").QueryResultCache;
        readonly tableName?: string;
        readonly options?: any;
        readonly alwaysEnabled?: boolean;
        readonly duration?: number;
        readonly ignoreErrors?: boolean;
    };
    url?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
    ssl?: any;
    socketPath?: string;
} | {
    name: string;
    type: "postgres";
    schema?: string;
    driver?: any;
    nativeDriver?: any;
    useUTC?: boolean;
    replication?: {
        readonly master: import("typeorm/driver/postgres/PostgresConnectionCredentialsOptions").PostgresConnectionCredentialsOptions;
        readonly slaves: import("typeorm/driver/postgres/PostgresConnectionCredentialsOptions").PostgresConnectionCredentialsOptions[];
    };
    connectTimeoutMS?: number;
    uuidExtension?: "pgcrypto" | "uuid-ossp";
    poolErrorHandler?: (err: any) => any;
    logNotifications?: boolean;
    installExtensions?: boolean;
    applicationName?: string;
    parseInt8?: boolean;
    entities?: import("typeorm").MixedList<string | Function | import("typeorm").EntitySchema<any>>;
    subscribers?: import("typeorm").MixedList<string | Function>;
    migrations?: import("typeorm").MixedList<string | Function>;
    migrationsTableName?: string;
    migrationsTransactionMode?: "all" | "none" | "each";
    metadataTableName?: string;
    namingStrategy?: import("typeorm").NamingStrategyInterface;
    logging?: import("typeorm").LoggerOptions;
    logger?: "file" | "debug" | "advanced-console" | "simple-console" | import("typeorm").Logger;
    maxQueryExecutionTime?: number;
    poolSize?: number;
    synchronize?: boolean;
    migrationsRun?: boolean;
    dropSchema?: boolean;
    entityPrefix?: string;
    entitySkipConstructor?: boolean;
    extra?: any;
    relationLoadStrategy?: "join" | "query";
    typename?: string;
    cache?: boolean | {
        readonly type?: "database" | "redis" | "ioredis" | "ioredis/cluster";
        readonly provider?: (connection: import("typeorm").DataSource) => import("typeorm/cache/QueryResultCache").QueryResultCache;
        readonly tableName?: string;
        readonly options?: any;
        readonly alwaysEnabled?: boolean;
        readonly duration?: number;
        readonly ignoreErrors?: boolean;
    };
    url?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string | (() => string) | (() => Promise<string>);
    database?: string;
    ssl?: boolean | import("tls").TlsOptions;
} | {
    name: string;
    type: "cockroachdb";
    timeTravelQueries: boolean;
    schema?: string;
    driver?: any;
    nativeDriver?: any;
    replication?: {
        readonly master: import("typeorm/driver/cockroachdb/CockroachConnectionCredentialsOptions").CockroachConnectionCredentialsOptions;
        readonly slaves: import("typeorm/driver/cockroachdb/CockroachConnectionCredentialsOptions").CockroachConnectionCredentialsOptions[];
    };
    applicationName?: string;
    poolErrorHandler?: (err: any) => any;
    maxTransactionRetries?: number;
    entities?: import("typeorm").MixedList<string | Function | import("typeorm").EntitySchema<any>>;
    subscribers?: import("typeorm").MixedList<string | Function>;
    migrations?: import("typeorm").MixedList<string | Function>;
    migrationsTableName?: string;
    migrationsTransactionMode?: "all" | "none" | "each";
    metadataTableName?: string;
    namingStrategy?: import("typeorm").NamingStrategyInterface;
    logging?: import("typeorm").LoggerOptions;
    logger?: "file" | "debug" | "advanced-console" | "simple-console" | import("typeorm").Logger;
    maxQueryExecutionTime?: number;
    poolSize?: number;
    synchronize?: boolean;
    migrationsRun?: boolean;
    dropSchema?: boolean;
    entityPrefix?: string;
    entitySkipConstructor?: boolean;
    extra?: any;
    relationLoadStrategy?: "join" | "query";
    typename?: string;
    cache?: boolean | {
        readonly type?: "database" | "redis" | "ioredis" | "ioredis/cluster";
        readonly provider?: (connection: import("typeorm").DataSource) => import("typeorm/cache/QueryResultCache").QueryResultCache;
        readonly tableName?: string;
        readonly options?: any;
        readonly alwaysEnabled?: boolean;
        readonly duration?: number;
        readonly ignoreErrors?: boolean;
    };
    url?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
    ssl?: boolean | import("tls").TlsOptions;
} | {
    name: string;
    type: "sqlite";
    database: string;
    driver?: any;
    key?: string;
    busyErrorRetry?: number;
    enableWAL?: boolean;
    flags?: number;
    poolSize?: never;
    busyTimeout?: number;
    entities?: import("typeorm").MixedList<string | Function | import("typeorm").EntitySchema<any>>;
    subscribers?: import("typeorm").MixedList<string | Function>;
    migrations?: import("typeorm").MixedList<string | Function>;
    migrationsTableName?: string;
    migrationsTransactionMode?: "all" | "none" | "each";
    metadataTableName?: string;
    namingStrategy?: import("typeorm").NamingStrategyInterface;
    logging?: import("typeorm").LoggerOptions;
    logger?: "file" | "debug" | "advanced-console" | "simple-console" | import("typeorm").Logger;
    maxQueryExecutionTime?: number;
    synchronize?: boolean;
    migrationsRun?: boolean;
    dropSchema?: boolean;
    entityPrefix?: string;
    entitySkipConstructor?: boolean;
    extra?: any;
    relationLoadStrategy?: "join" | "query";
    typename?: string;
    cache?: boolean | {
        readonly type?: "database" | "redis" | "ioredis" | "ioredis/cluster";
        readonly provider?: (connection: import("typeorm").DataSource) => import("typeorm/cache/QueryResultCache").QueryResultCache;
        readonly tableName?: string;
        readonly options?: any;
        readonly alwaysEnabled?: boolean;
        readonly duration?: number;
        readonly ignoreErrors?: boolean;
    };
} | {
    name: string;
    type: "mssql";
    connectionTimeout?: number;
    requestTimeout?: number;
    stream?: boolean;
    schema?: string;
    driver?: any;
    pool?: {
        readonly max?: number;
        readonly min?: number;
        readonly maxWaitingClients?: number;
        readonly testOnBorrow?: boolean;
        readonly acquireTimeoutMillis?: number;
        readonly fifo?: boolean;
        readonly priorityRange?: number;
        readonly evictionRunIntervalMillis?: number;
        readonly numTestsPerRun?: number;
        readonly softIdleTimeoutMillis?: number;
        readonly idleTimeoutMillis?: number;
        readonly errorHandler?: (err: any) => any;
    };
    options?: {
        readonly instanceName?: string;
        readonly fallbackToDefaultDb?: boolean;
        readonly enableAnsiNullDefault?: boolean;
        readonly connectTimeout?: number;
        readonly cancelTimeout?: number;
        readonly packetSize?: number;
        readonly useUTC?: boolean;
        readonly abortTransactionOnError?: boolean;
        readonly localAddress?: string;
        readonly useColumnNames?: boolean;
        readonly camelCaseColumns?: boolean;
        readonly disableOutputReturning?: boolean;
        readonly debug?: {
            readonly packet?: boolean;
            readonly data?: boolean;
            readonly payload?: boolean;
            readonly token?: boolean;
        };
        readonly isolation?: "READ_UNCOMMITTED" | "READ_COMMITTED" | "REPEATABLE_READ" | "SERIALIZABLE" | "SNAPSHOT";
        readonly connectionIsolationLevel?: "READ_UNCOMMITTED" | "READ_COMMITTED" | "REPEATABLE_READ" | "SERIALIZABLE" | "SNAPSHOT";
        readonly readOnlyIntent?: boolean;
        readonly encrypt?: boolean;
        readonly cryptoCredentialsDetails?: any;
        readonly rowCollectionOnDone?: boolean;
        readonly rowCollectionOnRequestCompletion?: boolean;
        readonly tdsVersion?: string;
        readonly enableArithAbort?: boolean;
        readonly appName?: string;
        readonly trustServerCertificate?: boolean;
    };
    replication?: {
        readonly master: import("typeorm/driver/sqlserver/SqlServerConnectionCredentialsOptions").SqlServerConnectionCredentialsOptions;
        readonly slaves: import("typeorm/driver/sqlserver/SqlServerConnectionCredentialsOptions").SqlServerConnectionCredentialsOptions[];
    };
    poolSize?: never;
    entities?: import("typeorm").MixedList<string | Function | import("typeorm").EntitySchema<any>>;
    subscribers?: import("typeorm").MixedList<string | Function>;
    migrations?: import("typeorm").MixedList<string | Function>;
    migrationsTableName?: string;
    migrationsTransactionMode?: "all" | "none" | "each";
    metadataTableName?: string;
    namingStrategy?: import("typeorm").NamingStrategyInterface;
    logging?: import("typeorm").LoggerOptions;
    logger?: "file" | "debug" | "advanced-console" | "simple-console" | import("typeorm").Logger;
    maxQueryExecutionTime?: number;
    synchronize?: boolean;
    migrationsRun?: boolean;
    dropSchema?: boolean;
    entityPrefix?: string;
    entitySkipConstructor?: boolean;
    extra?: any;
    relationLoadStrategy?: "join" | "query";
    typename?: string;
    cache?: boolean | {
        readonly type?: "database" | "redis" | "ioredis" | "ioredis/cluster";
        readonly provider?: (connection: import("typeorm").DataSource) => import("typeorm/cache/QueryResultCache").QueryResultCache;
        readonly tableName?: string;
        readonly options?: any;
        readonly alwaysEnabled?: boolean;
        readonly duration?: number;
        readonly ignoreErrors?: boolean;
    };
    url?: string;
    host?: string;
    port?: number;
    database?: string;
    username?: string;
    password?: string;
    authentication?: import("typeorm/driver/sqlserver/SqlServerConnectionCredentialsOptions").SqlServerConnectionCredentialsAuthenticationOptions;
    domain?: string;
} | {
    name: string;
    type: "sap";
    schema?: string;
    driver?: any;
    hanaClientDriver?: any;
    pool?: {
        readonly max?: number;
        readonly min?: number;
        readonly maxWaitingRequests?: number;
        readonly requestTimeout?: number;
        readonly checkInterval?: number;
        readonly idleTimeout?: number;
        readonly poolErrorHandler?: (err: any) => any;
    };
    poolSize?: never;
    entities?: import("typeorm").MixedList<string | Function | import("typeorm").EntitySchema<any>>;
    subscribers?: import("typeorm").MixedList<string | Function>;
    migrations?: import("typeorm").MixedList<string | Function>;
    migrationsTableName?: string;
    migrationsTransactionMode?: "all" | "none" | "each";
    metadataTableName?: string;
    namingStrategy?: import("typeorm").NamingStrategyInterface;
    logging?: import("typeorm").LoggerOptions;
    logger?: "file" | "debug" | "advanced-console" | "simple-console" | import("typeorm").Logger;
    maxQueryExecutionTime?: number;
    synchronize?: boolean;
    migrationsRun?: boolean;
    dropSchema?: boolean;
    entityPrefix?: string;
    entitySkipConstructor?: boolean;
    extra?: any;
    relationLoadStrategy?: "join" | "query";
    typename?: string;
    cache?: boolean | {
        readonly type?: "database" | "redis" | "ioredis" | "ioredis/cluster";
        readonly provider?: (connection: import("typeorm").DataSource) => import("typeorm/cache/QueryResultCache").QueryResultCache;
        readonly tableName?: string;
        readonly options?: any;
        readonly alwaysEnabled?: boolean;
        readonly duration?: number;
        readonly ignoreErrors?: boolean;
    };
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
    encrypt?: boolean;
    sslValidateCertificate?: boolean;
    key?: string;
    cert?: string;
    ca?: string;
} | {
    name: string;
    type: "oracle";
    schema?: string;
    driver?: any;
    useUTC?: boolean;
    replication?: {
        readonly master: import("typeorm/driver/oracle/OracleConnectionCredentialsOptions").OracleConnectionCredentialsOptions;
        readonly slaves: import("typeorm/driver/oracle/OracleConnectionCredentialsOptions").OracleConnectionCredentialsOptions[];
    };
    entities?: import("typeorm").MixedList<string | Function | import("typeorm").EntitySchema<any>>;
    subscribers?: import("typeorm").MixedList<string | Function>;
    migrations?: import("typeorm").MixedList<string | Function>;
    migrationsTableName?: string;
    migrationsTransactionMode?: "all" | "none" | "each";
    metadataTableName?: string;
    namingStrategy?: import("typeorm").NamingStrategyInterface;
    logging?: import("typeorm").LoggerOptions;
    logger?: "file" | "debug" | "advanced-console" | "simple-console" | import("typeorm").Logger;
    maxQueryExecutionTime?: number;
    poolSize?: number;
    synchronize?: boolean;
    migrationsRun?: boolean;
    dropSchema?: boolean;
    entityPrefix?: string;
    entitySkipConstructor?: boolean;
    extra?: any;
    relationLoadStrategy?: "join" | "query";
    typename?: string;
    cache?: boolean | {
        readonly type?: "database" | "redis" | "ioredis" | "ioredis/cluster";
        readonly provider?: (connection: import("typeorm").DataSource) => import("typeorm/cache/QueryResultCache").QueryResultCache;
        readonly tableName?: string;
        readonly options?: any;
        readonly alwaysEnabled?: boolean;
        readonly duration?: number;
        readonly ignoreErrors?: boolean;
    };
    url?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
    sid?: string;
    serviceName?: string;
    connectString?: string;
} | {
    name: string;
    type: "cordova";
    database: string;
    driver?: any;
    location: string;
    poolSize?: never;
    entities?: import("typeorm").MixedList<string | Function | import("typeorm").EntitySchema<any>>;
    subscribers?: import("typeorm").MixedList<string | Function>;
    migrations?: import("typeorm").MixedList<string | Function>;
    migrationsTableName?: string;
    migrationsTransactionMode?: "all" | "none" | "each";
    metadataTableName?: string;
    namingStrategy?: import("typeorm").NamingStrategyInterface;
    logging?: import("typeorm").LoggerOptions;
    logger?: "file" | "debug" | "advanced-console" | "simple-console" | import("typeorm").Logger;
    maxQueryExecutionTime?: number;
    synchronize?: boolean;
    migrationsRun?: boolean;
    dropSchema?: boolean;
    entityPrefix?: string;
    entitySkipConstructor?: boolean;
    extra?: any;
    relationLoadStrategy?: "join" | "query";
    typename?: string;
    cache?: boolean | {
        readonly type?: "database" | "redis" | "ioredis" | "ioredis/cluster";
        readonly provider?: (connection: import("typeorm").DataSource) => import("typeorm/cache/QueryResultCache").QueryResultCache;
        readonly tableName?: string;
        readonly options?: any;
        readonly alwaysEnabled?: boolean;
        readonly duration?: number;
        readonly ignoreErrors?: boolean;
    };
} | {
    name: string;
    type: "nativescript";
    database: string;
    driver: any;
    readOnly?: boolean;
    key?: string;
    multithreading?: boolean;
    migrate?: boolean;
    iosFlags?: number;
    androidFlags?: number;
    poolSize?: never;
    entities?: import("typeorm").MixedList<string | Function | import("typeorm").EntitySchema<any>>;
    subscribers?: import("typeorm").MixedList<string | Function>;
    migrations?: import("typeorm").MixedList<string | Function>;
    migrationsTableName?: string;
    migrationsTransactionMode?: "all" | "none" | "each";
    metadataTableName?: string;
    namingStrategy?: import("typeorm").NamingStrategyInterface;
    logging?: import("typeorm").LoggerOptions;
    logger?: "file" | "debug" | "advanced-console" | "simple-console" | import("typeorm").Logger;
    maxQueryExecutionTime?: number;
    synchronize?: boolean;
    migrationsRun?: boolean;
    dropSchema?: boolean;
    entityPrefix?: string;
    entitySkipConstructor?: boolean;
    extra?: any;
    relationLoadStrategy?: "join" | "query";
    typename?: string;
    cache?: boolean | {
        readonly type?: "database" | "redis" | "ioredis" | "ioredis/cluster";
        readonly provider?: (connection: import("typeorm").DataSource) => import("typeorm/cache/QueryResultCache").QueryResultCache;
        readonly tableName?: string;
        readonly options?: any;
        readonly alwaysEnabled?: boolean;
        readonly duration?: number;
        readonly ignoreErrors?: boolean;
    };
} | {
    name: string;
    type: "react-native";
    database: string;
    driver?: any;
    location: string;
    poolSize?: never;
    entities?: import("typeorm").MixedList<string | Function | import("typeorm").EntitySchema<any>>;
    subscribers?: import("typeorm").MixedList<string | Function>;
    migrations?: import("typeorm").MixedList<string | Function>;
    migrationsTableName?: string;
    migrationsTransactionMode?: "all" | "none" | "each";
    metadataTableName?: string;
    namingStrategy?: import("typeorm").NamingStrategyInterface;
    logging?: import("typeorm").LoggerOptions;
    logger?: "file" | "debug" | "advanced-console" | "simple-console" | import("typeorm").Logger;
    maxQueryExecutionTime?: number;
    synchronize?: boolean;
    migrationsRun?: boolean;
    dropSchema?: boolean;
    entityPrefix?: string;
    entitySkipConstructor?: boolean;
    extra?: any;
    relationLoadStrategy?: "join" | "query";
    typename?: string;
    cache?: boolean | {
        readonly type?: "database" | "redis" | "ioredis" | "ioredis/cluster";
        readonly provider?: (connection: import("typeorm").DataSource) => import("typeorm/cache/QueryResultCache").QueryResultCache;
        readonly tableName?: string;
        readonly options?: any;
        readonly alwaysEnabled?: boolean;
        readonly duration?: number;
        readonly ignoreErrors?: boolean;
    };
} | {
    name: string;
    type: "sqljs";
    database?: Uint8Array;
    driver?: any;
    sqlJsConfig?: any;
    autoSave?: boolean;
    autoSaveCallback?: Function;
    location?: string;
    useLocalForage?: boolean;
    poolSize?: never;
    entities?: import("typeorm").MixedList<string | Function | import("typeorm").EntitySchema<any>>;
    subscribers?: import("typeorm").MixedList<string | Function>;
    migrations?: import("typeorm").MixedList<string | Function>;
    migrationsTableName?: string;
    migrationsTransactionMode?: "all" | "none" | "each";
    metadataTableName?: string;
    namingStrategy?: import("typeorm").NamingStrategyInterface;
    logging?: import("typeorm").LoggerOptions;
    logger?: "file" | "debug" | "advanced-console" | "simple-console" | import("typeorm").Logger;
    maxQueryExecutionTime?: number;
    synchronize?: boolean;
    migrationsRun?: boolean;
    dropSchema?: boolean;
    entityPrefix?: string;
    entitySkipConstructor?: boolean;
    extra?: any;
    relationLoadStrategy?: "join" | "query";
    typename?: string;
    cache?: boolean | {
        readonly type?: "database" | "redis" | "ioredis" | "ioredis/cluster";
        readonly provider?: (connection: import("typeorm").DataSource) => import("typeorm/cache/QueryResultCache").QueryResultCache;
        readonly tableName?: string;
        readonly options?: any;
        readonly alwaysEnabled?: boolean;
        readonly duration?: number;
        readonly ignoreErrors?: boolean;
    };
} | {
    name: string;
    type: "mongodb";
    url?: string;
    host?: string;
    hostReplicaSet?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
    directConnection?: boolean;
    driver?: any;
    ssl?: boolean;
    sslValidate?: boolean;
    sslCA?: string | Buffer;
    sslCert?: string | Buffer;
    sslKey?: string;
    sslPass?: string | Buffer;
    sslCRL?: string | Buffer;
    autoReconnect?: boolean;
    noDelay?: boolean;
    keepAlive?: number;
    connectTimeoutMS?: number;
    family?: number;
    socketTimeoutMS?: number;
    reconnectTries?: number;
    reconnectInterval?: number;
    ha?: boolean;
    haInterval?: number;
    replicaSet?: string;
    acceptableLatencyMS?: number;
    secondaryAcceptableLatencyMS?: number;
    connectWithNoPrimary?: boolean;
    authSource?: string;
    w?: string | number;
    wtimeout?: number;
    j?: boolean;
    forceServerObjectId?: boolean;
    serializeFunctions?: boolean;
    ignoreUndefined?: boolean;
    raw?: boolean;
    promoteLongs?: boolean;
    promoteBuffers?: boolean;
    promoteValues?: boolean;
    domainsEnabled?: boolean;
    bufferMaxEntries?: number;
    readPreference?: string | import("typeorm").ReadPreference;
    pkFactory?: any;
    promiseLibrary?: any;
    readConcern?: any;
    maxStalenessSeconds?: number;
    loggerLevel?: "debug" | "error" | "warn" | "info";
    checkServerIdentity?: boolean | Function;
    validateOptions?: any;
    appname?: string;
    authMechanism?: string;
    compression?: any;
    fsync?: boolean;
    readPreferenceTags?: any[];
    numberOfRetries?: number;
    auto_reconnect?: boolean;
    monitorCommands?: boolean;
    minSize?: number;
    useNewUrlParser?: boolean;
    useUnifiedTopology?: boolean;
    autoEncryption?: any;
    retryWrites?: boolean;
    entities?: import("typeorm").MixedList<string | Function | import("typeorm").EntitySchema<any>>;
    subscribers?: import("typeorm").MixedList<string | Function>;
    migrations?: import("typeorm").MixedList<string | Function>;
    migrationsTableName?: string;
    migrationsTransactionMode?: "all" | "none" | "each";
    metadataTableName?: string;
    namingStrategy?: import("typeorm").NamingStrategyInterface;
    logging?: import("typeorm").LoggerOptions;
    logger?: "file" | "debug" | "advanced-console" | "simple-console" | import("typeorm").Logger;
    maxQueryExecutionTime?: number;
    poolSize?: number;
    synchronize?: boolean;
    migrationsRun?: boolean;
    dropSchema?: boolean;
    entityPrefix?: string;
    entitySkipConstructor?: boolean;
    extra?: any;
    relationLoadStrategy?: "join" | "query";
    typename?: string;
    cache?: boolean | {
        readonly type?: "database" | "redis" | "ioredis" | "ioredis/cluster";
        readonly provider?: (connection: import("typeorm").DataSource) => import("typeorm/cache/QueryResultCache").QueryResultCache;
        readonly tableName?: string;
        readonly options?: any;
        readonly alwaysEnabled?: boolean;
        readonly duration?: number;
        readonly ignoreErrors?: boolean;
    };
} | {
    name: string;
    type: "aurora-mysql";
    region: string;
    secretArn: string;
    resourceArn: string;
    database: string;
    driver?: any;
    serviceConfigOptions?: {
        [key: string]: any;
    };
    formatOptions?: {
        [key: string]: any;
        castParameters: boolean;
    };
    legacySpatialSupport?: boolean;
    poolSize?: never;
    entities?: import("typeorm").MixedList<string | Function | import("typeorm").EntitySchema<any>>;
    subscribers?: import("typeorm").MixedList<string | Function>;
    migrations?: import("typeorm").MixedList<string | Function>;
    migrationsTableName?: string;
    migrationsTransactionMode?: "all" | "none" | "each";
    metadataTableName?: string;
    namingStrategy?: import("typeorm").NamingStrategyInterface;
    logging?: import("typeorm").LoggerOptions;
    logger?: "file" | "debug" | "advanced-console" | "simple-console" | import("typeorm").Logger;
    maxQueryExecutionTime?: number;
    synchronize?: boolean;
    migrationsRun?: boolean;
    dropSchema?: boolean;
    entityPrefix?: string;
    entitySkipConstructor?: boolean;
    extra?: any;
    relationLoadStrategy?: "join" | "query";
    typename?: string;
    cache?: boolean | {
        readonly type?: "database" | "redis" | "ioredis" | "ioredis/cluster";
        readonly provider?: (connection: import("typeorm").DataSource) => import("typeorm/cache/QueryResultCache").QueryResultCache;
        readonly tableName?: string;
        readonly options?: any;
        readonly alwaysEnabled?: boolean;
        readonly duration?: number;
        readonly ignoreErrors?: boolean;
    };
    url?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    ssl?: any;
} | {
    name: string;
    type: "aurora-postgres";
    region: string;
    secretArn: string;
    resourceArn: string;
    database: string;
    driver?: any;
    uuidExtension?: "pgcrypto" | "uuid-ossp";
    transformParameters?: boolean;
    poolErrorHandler?: (err: any) => any;
    serviceConfigOptions?: {
        [key: string]: any;
    };
    formatOptions?: {
        [key: string]: any;
        castParameters: boolean;
    };
    poolSize?: never;
    entities?: import("typeorm").MixedList<string | Function | import("typeorm").EntitySchema<any>>;
    subscribers?: import("typeorm").MixedList<string | Function>;
    migrations?: import("typeorm").MixedList<string | Function>;
    migrationsTableName?: string;
    migrationsTransactionMode?: "all" | "none" | "each";
    metadataTableName?: string;
    namingStrategy?: import("typeorm").NamingStrategyInterface;
    logging?: import("typeorm").LoggerOptions;
    logger?: "file" | "debug" | "advanced-console" | "simple-console" | import("typeorm").Logger;
    maxQueryExecutionTime?: number;
    synchronize?: boolean;
    migrationsRun?: boolean;
    dropSchema?: boolean;
    entityPrefix?: string;
    entitySkipConstructor?: boolean;
    extra?: any;
    relationLoadStrategy?: "join" | "query";
    typename?: string;
    cache?: boolean | {
        readonly type?: "database" | "redis" | "ioredis" | "ioredis/cluster";
        readonly provider?: (connection: import("typeorm").DataSource) => import("typeorm/cache/QueryResultCache").QueryResultCache;
        readonly tableName?: string;
        readonly options?: any;
        readonly alwaysEnabled?: boolean;
        readonly duration?: number;
        readonly ignoreErrors?: boolean;
    };
} | {
    name: string;
    type: "expo";
    database: string;
    driver: any;
    poolSize?: never;
    entities?: import("typeorm").MixedList<string | Function | import("typeorm").EntitySchema<any>>;
    subscribers?: import("typeorm").MixedList<string | Function>;
    migrations?: import("typeorm").MixedList<string | Function>;
    migrationsTableName?: string;
    migrationsTransactionMode?: "all" | "none" | "each";
    metadataTableName?: string;
    namingStrategy?: import("typeorm").NamingStrategyInterface;
    logging?: import("typeorm").LoggerOptions;
    logger?: "file" | "debug" | "advanced-console" | "simple-console" | import("typeorm").Logger;
    maxQueryExecutionTime?: number;
    synchronize?: boolean;
    migrationsRun?: boolean;
    dropSchema?: boolean;
    entityPrefix?: string;
    entitySkipConstructor?: boolean;
    extra?: any;
    relationLoadStrategy?: "join" | "query";
    typename?: string;
    cache?: boolean | {
        readonly type?: "database" | "redis" | "ioredis" | "ioredis/cluster";
        readonly provider?: (connection: import("typeorm").DataSource) => import("typeorm/cache/QueryResultCache").QueryResultCache;
        readonly tableName?: string;
        readonly options?: any;
        readonly alwaysEnabled?: boolean;
        readonly duration?: number;
        readonly ignoreErrors?: boolean;
    };
} | {
    name: string;
    type: "better-sqlite3";
    database: string;
    driver?: any;
    key?: string;
    statementCacheSize?: number;
    prepareDatabase?: (db: any) => void | Promise<void>;
    readonly?: boolean;
    fileMustExist?: boolean;
    timeout?: number;
    verbose?: Function;
    nativeBinding?: string;
    poolSize?: never;
    enableWAL?: boolean;
    entities?: import("typeorm").MixedList<string | Function | import("typeorm").EntitySchema<any>>;
    subscribers?: import("typeorm").MixedList<string | Function>;
    migrations?: import("typeorm").MixedList<string | Function>;
    migrationsTableName?: string;
    migrationsTransactionMode?: "all" | "none" | "each";
    metadataTableName?: string;
    namingStrategy?: import("typeorm").NamingStrategyInterface;
    logging?: import("typeorm").LoggerOptions;
    logger?: "file" | "debug" | "advanced-console" | "simple-console" | import("typeorm").Logger;
    maxQueryExecutionTime?: number;
    synchronize?: boolean;
    migrationsRun?: boolean;
    dropSchema?: boolean;
    entityPrefix?: string;
    entitySkipConstructor?: boolean;
    extra?: any;
    relationLoadStrategy?: "join" | "query";
    typename?: string;
    cache?: boolean | {
        readonly type?: "database" | "redis" | "ioredis" | "ioredis/cluster";
        readonly provider?: (connection: import("typeorm").DataSource) => import("typeorm/cache/QueryResultCache").QueryResultCache;
        readonly tableName?: string;
        readonly options?: any;
        readonly alwaysEnabled?: boolean;
        readonly duration?: number;
        readonly ignoreErrors?: boolean;
    };
} | {
    name: string;
    type: "capacitor";
    driver: any;
    database: string;
    mode?: "no-encryption" | "encryption" | "secret" | "newsecret";
    version?: number;
    journalMode?: "DELETE" | "TRUNCATE" | "PERSIST" | "MEMORY" | "WAL" | "OFF";
    poolSize?: never;
    entities?: import("typeorm").MixedList<string | Function | import("typeorm").EntitySchema<any>>;
    subscribers?: import("typeorm").MixedList<string | Function>;
    migrations?: import("typeorm").MixedList<string | Function>;
    migrationsTableName?: string;
    migrationsTransactionMode?: "all" | "none" | "each";
    metadataTableName?: string;
    namingStrategy?: import("typeorm").NamingStrategyInterface;
    logging?: import("typeorm").LoggerOptions;
    logger?: "file" | "debug" | "advanced-console" | "simple-console" | import("typeorm").Logger;
    maxQueryExecutionTime?: number;
    synchronize?: boolean;
    migrationsRun?: boolean;
    dropSchema?: boolean;
    entityPrefix?: string;
    entitySkipConstructor?: boolean;
    extra?: any;
    relationLoadStrategy?: "join" | "query";
    typename?: string;
    cache?: boolean | {
        readonly type?: "database" | "redis" | "ioredis" | "ioredis/cluster";
        readonly provider?: (connection: import("typeorm").DataSource) => import("typeorm/cache/QueryResultCache").QueryResultCache;
        readonly tableName?: string;
        readonly options?: any;
        readonly alwaysEnabled?: boolean;
        readonly duration?: number;
        readonly ignoreErrors?: boolean;
    };
} | {
    name: string;
    type: "spanner";
    driver?: any;
    database?: string;
    schema?: string;
    charset?: string;
    timezone?: string;
    connectTimeout?: number;
    acquireTimeout?: number;
    insecureAuth?: boolean;
    supportBigNumbers?: boolean;
    bigNumberStrings?: boolean;
    dateStrings?: boolean | string[];
    debug?: boolean | string[];
    trace?: boolean;
    multipleStatements?: boolean;
    legacySpatialSupport?: boolean;
    flags?: string[];
    replication?: {
        readonly master: import("typeorm/driver/spanner/SpannerConnectionCredentialsOptions").SpannerConnectionCredentialsOptions;
        readonly slaves: import("typeorm/driver/spanner/SpannerConnectionCredentialsOptions").SpannerConnectionCredentialsOptions[];
        readonly canRetry?: boolean;
        readonly removeNodeErrorCount?: number;
        readonly restoreNodeTimeout?: number;
        readonly selector?: "RR" | "RANDOM" | "ORDER";
    };
    poolSize?: never;
    entities?: import("typeorm").MixedList<string | Function | import("typeorm").EntitySchema<any>>;
    subscribers?: import("typeorm").MixedList<string | Function>;
    migrations?: import("typeorm").MixedList<string | Function>;
    migrationsTableName?: string;
    migrationsTransactionMode?: "all" | "none" | "each";
    metadataTableName?: string;
    namingStrategy?: import("typeorm").NamingStrategyInterface;
    logging?: import("typeorm").LoggerOptions;
    logger?: "file" | "debug" | "advanced-console" | "simple-console" | import("typeorm").Logger;
    maxQueryExecutionTime?: number;
    synchronize?: boolean;
    migrationsRun?: boolean;
    dropSchema?: boolean;
    entityPrefix?: string;
    entitySkipConstructor?: boolean;
    extra?: any;
    relationLoadStrategy?: "join" | "query";
    typename?: string;
    cache?: boolean | {
        readonly type?: "database" | "redis" | "ioredis" | "ioredis/cluster";
        readonly provider?: (connection: import("typeorm").DataSource) => import("typeorm/cache/QueryResultCache").QueryResultCache;
        readonly tableName?: string;
        readonly options?: any;
        readonly alwaysEnabled?: boolean;
        readonly duration?: number;
        readonly ignoreErrors?: boolean;
    };
    instanceId?: string;
    projectId?: string;
    databaseId?: string;
}>;
export declare const getDbConnection: (connectionName?: string) => Promise<import("typeorm").DataSource>;
export declare const runDbMigrations: (connectionName?: string) => Promise<void>;
export declare const hash: (value: any) => Promise<any>;
export declare const compare: (newValue: any, hashedValue: any) => Promise<any>;
export declare const getAge: (birthDate: Date) => Promise<number>;
export declare const addHours: (numOfHours: any, date: Date) => Date;
export declare const round: (number: any) => number;
export declare function getEnvPath(dest: string): string;
export declare function ToBoolean(): (target: any, key: string) => void;
export declare function formatId(value: any, args?: any): unknown;
export declare const convertColumnNotationToObject: (notation: any, nestedValue: any) => {};
export declare const getFullName: (firstName: string, middleName: string, lastName: string) => string;
export declare const columnDefToTypeORMCondition: (columnDef: any) => any;
export declare const generateIndentityCode: (id: any) => string;
export declare const monthDiff: (d1: Date, d2: Date) => any;
export declare const weeksDiff: (d1: any, d2: any) => number;
export declare const daysDiff: (d1: any, d2: any) => number;
export declare const getBill: (dueAmount: number, dueDate: Date) => {
    dueAmount: string;
    overdueDays: number;
    overdueWeeks: number;
    overdueMonths: any;
    overdueCharge: string;
    totalDueAmount: string;
};
