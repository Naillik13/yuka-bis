import React from 'react';
import { StyleSheet, ActivityIndicator, ScrollView, Slider, Text, Image, View } from 'react-native';

export default class ProductScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
    });
    
    componentDidMount() {
        return fetch('https://world.openfoodfacts.org/api/v0/product/' + this.props.navigation.getParam('productCode', 'NO-ID') + '.json')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    code: this.props.navigation.getParam('productCode', 'NO-ID'),
                    product: responseJson.product,
                }, function () {
                    
                });
                this.props.navigation.setParams({ title: responseJson.product.product_name })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    formatHtml(text) {
        const regex = /(<([^>]+)>)/ig;
        return text.replace(regex, "")
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View  style={styles.scrollBox}>
                <ScrollView>
                    <Image resizeMode={'contain'} style={{ alignSelf: "center", borderRadius: 20, width: 150, height: 200 }} source={{ uri: this.state.product.image_url }} />
                    <Text style={styles.title}>{this.state.product.product_name}</Text>
                    <View>
                        <View style={styles.section}>
                            <Text style={styles.subtitle}>Ingredients</Text>
                            <Text>{this.state.product.ingredients_text_with_allergens_fr.trim() == "" ? "Non renseigné" : this.formatHtml(this.state.product.ingredients_text_with_allergens_fr)}</Text>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.subtitle}>Nutriments</Text>
                            <Text>Proteins: {this.state.product.nutriments.proteins_value} {this.state.product.nutriments.proteins_unit}</Text>
                            <Text>Energy: {this.state.product.nutriments.energy_value} {this.state.product.nutriments.energy_unit}</Text>
                            <Text>Sugars: {this.state.product.nutriments.sugars_value} {this.state.product.nutriments.sugars_unit}</Text>
                        </View>
                        
                    </View>
                    <View style={{alignSelf: "center" }}>
                        <Text style={styles.title}>Nutrition Score</Text>
                        <Text style={{alignSelf: "center"}}>{this.state.product.nutriments["nutrition-score-uk"]} / 100</Text>
                        <Slider
                            step={1}
                            disabled={true}
                            maximumValue={100}
                            value={this.state.product.nutriments["nutrition-score-uk"]}
                            style={{ width: 300 }}
                            />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold", 
        alignSelf: "center",
        fontSize: 18,
        margin: 15
    },
    subtitle: {
        fontWeight: "bold"
    },
    section: {
        margin: 10
    },
    scrollBox: {
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0.5 * 5 },
        shadowOpacity: 0.3,
        shadowRadius: 0.8 * 5,
        flex: 1, 
        padding: 20, 
        margin: 20, 
        borderRadius: 20,
        backgroundColor: "#fff"
    }
})