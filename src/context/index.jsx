import React, { Component, createContext } from "react"
import Cookies from "js-cookie"
const RootContext = createContext()

// Provider
const Provider = RootContext.Provider
export default function GlobalProvider(Children) {
  return(
    class ParentComp extends Component{
      state = {
        login: Cookies.get('login') === 'true' ? true : false,
        name: Cookies.get('name') ? Cookies.get('name') : '',
        id_admin: Cookies.get('id_admin') ? parseInt(Cookies.get('id_admin')) : 0,
        signIn: a => {
          Cookies.set('login', true)
          Cookies.set('name', a.name)
          Cookies.set('id_admin', a.id_admin)
        },
        signOut: () => {
          Cookies.remove('login')
          Cookies.remove('name')
          Cookies.remove('id_admin')
          window.location.href = '/'
        }
      }

      render(){
        return(
          <Provider value={
            {
              state: this.state
            }
          }>
            <Children />
          </Provider>
        )
      }
    }
  )
}

// Consumer
const Consumer = RootContext.Consumer
export const GlobalConsumer = (Children) => {
  return(
    class ParentConsumer extends Component{
      render(){
        return(
          <Consumer>
            {
              value => {
                return(
                  <Children {...this.props} {...value} />
                )
              }
            }
          </Consumer>
        )
      }
    }
  )
}
