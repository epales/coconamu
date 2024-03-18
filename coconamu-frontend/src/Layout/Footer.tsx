function Footer() {
    const styles = {
        promAlert: {
            width: "100%",
            height: "150px",
            backgroundColor: "gray"
        } as React.CSSProperties,
    }
    return (
        <div>
            <div style={styles.promAlert}></div>
        </div>
    );
}


export default Footer;