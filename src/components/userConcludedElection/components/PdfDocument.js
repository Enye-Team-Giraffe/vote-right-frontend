/* eslint-disable max-lines-per-function */
import React from 'react';
import {
    Page, Text, View, Document, StyleSheet
} from '@react-pdf/renderer';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    body: {
        paddingBottom: 65,
        paddingHorizontal: 35,
        paddingTop: 35,
    },
    cell: {
        alignSelf: 'stretch',
        flex: 1,
    },
    row: {
        alignSelf: 'stretch',
        borderColor: '#eee',
        borderWidth: '1',
        flex: 1,
        flexDirection: 'row',
    },
    text: {
        fontFamily: 'Times-Roman',
        fontSize: 12,
        margin: 12,
        textAlign: 'justify',
    },
    title: {
        fontSize: 14,
        paddingBottom: '20',
        textAlign: 'center',
    },
});

const Row = ({
    name, party, age, voteCount,
}) => (
    <View style={styles.row}>
        <View style={styles.cell}>
            <Text style={styles.text}>{name}</Text>
        </View>
        <View style={styles.cell}>
            <Text style={styles.text}>{party}</Text>
        </View>
        <View style={styles.cell}>
            <Text style={styles.text}>{age}</Text>
        </View>
        <View style={styles.cell}>
            <Text style={styles.text}>{voteCount}</Text>
        </View>
    </View>
);

const PdfDocument = ({ name, candidates }) => (
    <Document>
        <Page style={styles.body}>
            <View>
                <Text style={styles.title}>{name}</Text>
                <Row
                    name="Name"
                    age="Age"
                    party="Party"
                    voteCount="Vote Count"
                />
                {
                    candidates.map(candidate => (
                        <Row
                            key={candidate.id}
                            name={candidate.name}
                            age={candidate.age}
                            party={candidate.party}
                            voteCount={candidate.voteCount}
                        />
                    ))
                }
            </View>
        </Page>
    </Document>
);

export default PdfDocument;

Row.propTypes = {
    age: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    party: PropTypes.string.isRequired,
    voteCount: PropTypes.string.isRequired,
};

PdfDocument.propTypes = {
    candidates: PropTypes.arrayOf(
        PropTypes.shape({
            age: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            party: PropTypes.string.isRequired,
            voteCount: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    name: PropTypes.string.isRequired,
};
