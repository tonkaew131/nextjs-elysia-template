import fs from 'node:fs/promises';
import openapiTS, { astToString } from 'openapi-typescript';
import ts from 'typescript';

const FILE = ts.factory.createTypeReferenceNode(
    ts.factory.createIdentifier('File')
); // `File`
const NULL = ts.factory.createLiteralTypeNode(ts.factory.createNull()); // `null`

async function generateType() {
    const ast = await openapiTS(new URL('http://localhost:3001/swagger/json'), {
        transform(schemaObject, _metadata) {
            if (schemaObject.format === 'binary') {
                return schemaObject.nullable
                    ? ts.factory.createUnionTypeNode([FILE, NULL])
                    : FILE;
            }
        },
    });
    const contents = astToString(ast);

    await fs.writeFile('./src/libs/api/api.d.ts', contents);
}

generateType();
