import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
	View,
	Text,
	FlatList,

	AppRegistry,
	ActivityIndicator,
	ListView,
	Alert,
	Image,
	Plat,
	TouchableHighlight,

	SafeAreaView,
	StyleSheet,
	ScrollView,
	StatusBar,
	ImageBackground,
} from 'react-native';

class ActivityHome extends React.Component<Props> {
	render() {
		return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Home Screen</Text>
		</View>
		);
	}
}

class ActivityProfile extends React.Component<Props> {
	render() {
		return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Hi Profile!</Text>
		</View>
		);
	}
}

class ActivityList extends React.Component<Props> {
	render() {
		return (
		<View style={styles.container}>
			<FlatList
				data={[
				{key: 'Devin'},
				{key: 'Dan'},
				{key: 'Dominic'},
				{key: 'Jackson'},
				{key: 'James'},
				{key: 'Joel'},
				{key: 'John'},
				{key: 'Jillian'},
				{key: 'Jimmy'},
				{key: 'Julie'},
			]}
			renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
			/>
		</View>
		);
	}
}


class ActivityRow extends React.Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			navigate: this.props.navigation,
		}
	}
	componentDidMount() {
		return fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					isLoading: false,
					dataSource: responseJson,
				}, function() {

				});
		},(err) => {
			console.warn('error',err)
		})
		.catch((error) => {
			console.error(error);
			return error;
		});
	}
	FlatListItemSeparator = () => {
		return (
			<View style={{height: 1,width: "100%",backgroundColor: "#607D8B"}} />
		);
	}
	GetFlatListItem (fruit_name) {
		Alert.alert(fruit_name);
	}
	renderItem(item) {
		item.image='https://avatars2.githubusercontent.com/u/46446002?s=460&v=4';
		return (
		<TouchableHighlight underlayColor='#dddddd' onPress={() => this.state.navigate('Profile', {name: item.name})}>
			<View style={styles.itemRow}>
				<Image source={{uri: item.image}} style={styles.imageViewContainer}/>
				<View style={styles.textViewContainer}>
					<Text style={styles.Itemtitle} onPress={this.GetFlatListItem.bind(this, item.name)}>
						{item.name}
					</Text>
					<Text style={styles.Itemsubtitle} onPress={this.GetFlatListItem.bind(this, item.name)}>
						{item.company.catchPhrase}
					</Text>
				</View>
			</View>
		</TouchableHighlight>
		);
	}
	static navigationOptions = {
		title: 'Finder',
	};
	render() {
		if (this.state.isLoading) {
			return (
				<View style={{flex: 1, paddingTop: 20}}>
					<ActivityIndicator />
				</View>
			);
		}
		return (
		<View style={styles.MainContainer}>
			<FlatList
				data={ this.state.dataSource }
				// ItemSeparatorComponent = {this.FlatListItemSeparator}
				renderItem={({item}) => this.renderItem(item)}
				keyExtractor={(item, index) => index}
			/>
		</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 22
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},

	MainContainer :{
		justifyContent: 'center',
		flex:1,
		margin: 5,
		paddingTop: (Platform.OS === 'ios') ? 20 : 0,
	},
	itemRow: {
		direction: 'rtl',
		flex: 1,
		flexDirection: 'row-reverse',
		// flexWrap: 'wrap',
		alignItems: 'flex-end'
	},
	imageViewContainer: {
		width: 44,
		height: 44,
		margin: 10,
		borderRadius: 22,
	},
	textViewContainer: {
		width:'auto',
		paddingTop: 10,
		// padding:20
	},
	Itemtitle: {
		width: '100%',
		textAlign: 'right',
	},
	Itemsubtitle: {
		width: '100%',
		color: '#ababab',
		// backgroundColor: 'green',
		textAlign: 'right',
	},
})

const AppNavigator = createStackNavigator({
	Home: {
		screen: ActivityHome,
	},
	List: {
		screen: ActivityList,
	},
	Row: {
		screen: ActivityRow,
	},
	Profile: {
		screen: ActivityProfile,
	},
}, {
	initialRouteName: "Row",
});
export default createAppContainer(AppNavigator);
