import { IInputs } from '../generated/ManifestTypes';
import * as React from 'react';

export interface DummyImageControlProps {
    context: ComponentFramework.Context<IInputs>;
}

const IMAGES = [
    'images/pcf-getresource-error.png',
    'images/pcf_getresource_error.png',
];

export function DummyImageControl(props: DummyImageControlProps) {
    const [images, setImages] = React.useState<string[]>([]);

    React.useEffect(() => {
        const promises: Promise<unknown>[] = [];
        const img: string[] = [];

        IMAGES.forEach(name => {
            promises.push(
                getImage(props.context, name)
                    .then(data => img.push(data))
                    .catch(() => console.error(`Error while loading ${name}`)));
        });

        Promise.all(promises).then(() => setImages(img));
    }, []);

    return <div>
        {images.map((img, i) => {
            return <img key={i} src={`data:image/png;base64,${img}`} />
        })}
    </div>;
}

function getImage(context: ComponentFramework.Context<unknown>, id: string): Promise<string> {

    return new Promise((resolve, reject) => {
        context.resources.getResource(
            id,
            resolve,
            reject
        );
    });
}