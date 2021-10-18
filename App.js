import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "./components/Search";
import Dashboard from "./components/Dashboard";
import ProfileDetails from "./components/ProfileDetails";
import Repositories from "./components/Repositories";
import BrowserView from "./components/WebView";
import Notes from "./components/Notes";
import GlobalContext, { ACTIONS, Reducer } from './components/Context'
import STORAGE, { getData } from "./components/storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const initialState = {
    user: null,
    repos: []
  }
  const [state, dispatch] = React.useReducer(Reducer, initialState)
  const setUser = (user) => {
    dispatch({ type: ACTIONS.SET_USER, user: user })
  }
  const setRepos = (repos) => {
    dispatch({ type: ACTIONS.SET_REPOS, repos: repos })
  }
  const getLocalData = async () => {
    const data = await getData(STORAGE.KEY)
    if (data) {
      const current = new Date().getTime();
      if (current - data.createdAt <= 30 * 24 * 60 * 60 * 1000) {
        dispatch({ type: ACTIONS.INIT_DATA, data })
      }
    }
  }

  React.useEffect(() => {
    getLocalData()
  }, [])
  return (
    <NavigationContainer>
      <GlobalContext.Provider
        value={{ user: state.user, repos: state.repos, setUser, setRepos }}>
        <Stack.Navigator>
          <Stack.Screen
            name="Search"
            component={Search}
          // options={{ title: "Search" }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
          // options={({ route: { params } }) => ({ title: params.data.name })}
          />
          <Stack.Screen
            name="Profile Details"
            component={ProfileDetails}
          // options={{ title: 'Profile Details' }}
          />
          <Stack.Screen
            name="Repositories"
            component={Repositories}
          // options={{ title: 'Repositories' }}
          />
          <Stack.Screen
            name="WebView"
            component={BrowserView}
          // options={{ title: 'Repository Details' }}
          />
          <Stack.Screen
            name="Notes"
            component={Notes}
          // options={{ title: 'Notes' }}
          />
        </Stack.Navigator>
      </GlobalContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
