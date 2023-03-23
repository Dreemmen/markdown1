function BlockCode({children, index}) {
    return (
        <code key={index} style={{whiteSpace: 'pre-wrap'}}>
        {children}
        </code>
    )
}
export default BlockCode