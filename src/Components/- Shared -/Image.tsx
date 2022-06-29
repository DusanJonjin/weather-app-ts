interface ImageProps {
    imgSrc: string,
    imgAlt: string
}

const Image = ({ imgSrc, imgAlt }: ImageProps) => {
    return (
        <img src={imgSrc} alt={imgAlt} />
    );
}

export default Image;