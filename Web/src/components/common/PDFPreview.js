

import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

import font1 from './Roboto-Regular.ttf';
import font2 from './Roboto-Medium.ttf';

Font.register({
    family: 'Roboto-400',
    format: "truetype",
    src: font1,
});

Font.register({
    family: 'Roboto-500',
    format: "truetype",
    src: font2,
});

// Create styles
const styles = StyleSheet.create({
    page: {
        paddingTop: 64,
        paddingBottom: 65,
        paddingHorizontal: 48,
        backgroundColor: '#fff',
        fontFamily: 'Roboto-400',
    },
    content: {
        flexDirection: 'row',
        marginVertical: 15,
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexGrow: 1,
    },
    contentLeft: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingRight: 48,
        width: '50%',
    },
    contentRight: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 48,
        width: '50%',
    },
    image: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15,
        width: 200,
        height: 'auto',
    },
    name: {
        fontFamily: 'Roboto-500',
        textAlign: 'center',
        marginTop: 15,
    },
    text: {
        marginTop: 15,
        fontFamily: 'Roboto-400',
        fontSize: 14,
    }
});

// Create Document Component
const PDFPreview = ({ patient }) => {
    const { name, age, score, gender, antecedent, covid19, phone, file, disease } = patient;
    const [realGender, setRealGender] = useState('');
    useEffect(() => {
        const checkGender = (gender) => {
            switch (gender) {
                case 1: return 'Nam';
                case 2: return 'Nữ';
                case 3: return 'Khác';
                default: return ''
            }
        }
        setRealGender(checkGender(gender));

    }, [gender])

    return (
        <Document >
            <Page size="A4" style={styles.page}>

                <Text style={styles.name}>{name ? name : 'Bệnh nhân'}</Text>

                <Image
                    style={styles.image}
                    src={file ? file : process.env.REACT_APP_DEFAULT_IMG}
                />

                {disease && <Text style={styles.name}>Bệnh: {disease}</Text>}

                <View style={styles.content}>
                    <View style={styles.contentLeft}>
                        <Text style={styles.text}>Tình trạng: {score ? score : '.............'}</Text>
                        <Text style={styles.text}>Giới tính: {realGender ? realGender : '.........'}</Text>
                        <Text style={styles.text}>SĐT: {phone ? phone : '.....................'}</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <Text style={styles.text}>Tuổi: {age ? age : '........'}</Text>
                        <Text style={styles.text}>Tiền sử bệnh: {antecedent ? antecedent : '............'}</Text>
                        <Text style={styles.text}>Covid19: {covid19 ? 'Chưa xét nghiệm' : 'Đã xét nghiệm'}</Text>
                    </View>

                </View>
            </Page>
        </Document>
    )
};

export default PDFPreview;