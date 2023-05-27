module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 60000,
    moduleNameMapper: {
        "@exmpl/(.*)": "<rootDir>/src/$1"
    },
};