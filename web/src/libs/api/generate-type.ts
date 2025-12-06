import fs from 'node:fs/promises';
import openapiTS, { astToString } from 'openapi-typescript';
import ts from 'typescript';

const DATE = ts.factory.createTypeReferenceNode(
    ts.factory.createIdentifier('Date')
); // `Date`
const FILE = ts.factory.createTypeReferenceNode(
    ts.factory.createIdentifier('File')
); // `File`
const NULL = ts.factory.createLiteralTypeNode(ts.factory.createNull()); // `null`

async function generateType() {
    const url = new URL('http://localhost:3002/openapi/json');
    const ast = await openapiTS(url, {
        transform(schemaObject) {
            if (schemaObject.format === 'binary') {
                return schemaObject.nullable
                    ? ts.factory.createUnionTypeNode([FILE, NULL])
                    : FILE;
            }

            if ((schemaObject.type as string) === 'Date') {
                return DATE;
            }
        },
    });
    const contents = astToString(ast);

    await fs.writeFile('./src/libs/api/api.d.ts', contents);
}

generateType();
