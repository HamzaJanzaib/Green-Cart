export const extractPublicId = (url) => {
    const parts = url.split('/');
    const fileName = parts[parts.length - 1];
    const [publicId] = fileName.split('.');
    return `${parts[parts.length - 2]}/${publicId}`;
};
