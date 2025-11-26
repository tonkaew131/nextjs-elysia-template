'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { $api } from '@/libs/api';

export default function UploadingTest() {
    const [file, setFile] = useState<File | null>(null);
    const { mutate, isPending } = $api.useMutation('post', '/test/upload-file');

    return (
        <Card className="grid h-fit w-80 gap-2 p-4">
            <Label>Uploading test</Label>
            <Input
                type="file"
                onChange={(e) => {
                    setFile(e.target.files ? e.target.files[0] : null);
                }}
            />

            <Button
                disabled={!file || isPending}
                onClick={() =>
                    file &&
                    mutate({
                        body: {
                            file: file,
                            'nullable-file': null,
                        },
                    })
                }
            >
                Upload
            </Button>
        </Card>
    );
}
