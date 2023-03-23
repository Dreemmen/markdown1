function BlockImage({alt, src}) {
    console.log(alt)
    console.log(src)
    return (
        <img width="600px" alt={alt} src={src} />
    )
}
export default BlockImage