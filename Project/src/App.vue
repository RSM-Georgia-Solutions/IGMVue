<template>
    <v-app>
    
        <v-navigation-drawer color="red" fixed temporary v-model="sideNav">
            <v-list>
                <v-list-tile to="/Buildings">
                    <v-list-tile-action>
                        <v-icon>playlist_add_check</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        Buildings
                    </v-list-tile-content>
                </v-list-tile>
    
                <v-list-tile to="/Issues">
                    <v-list-tile-action>
                        <v-icon>gavel</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        Issues
                    </v-list-tile-content>
    
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    
        <v-toolbar class="green" dark>
            <v-toolbar-side-icon @click="sideNav = !sideNav" class="hidden-lg-and-up"></v-toolbar-side-icon>
            <v-toolbar-title class="mr-4">
                <router-link to="Test" tag="span" style="cursor:no-drop">Title</router-link>
            </v-toolbar-title>
    
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat to="/Buildings">
                    <v-icon left>playlist_add_check</v-icon>
                    Buildings
                </v-btn>
    
                <v-btn flat to="/Issues">
                    <v-icon left>gavel</v-icon>
                    Issues</v-btn>
    
            </v-toolbar-items>
    
            <v-spacer></v-spacer>
    
            <v-badge left color="red">
                <router-link :to="{name:'Notifications'}" slot="badge" tag="span" style="cursor:help">3</router-link>
               
                <v-icon>
                    mail
                </v-icon>
            </v-badge>
    
        </v-toolbar>
    
        <main>
            <router-view></router-view>
        </main>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                sideNav: false
            }
        }
    }
</script>

<style lang="scss">
    
</style>
