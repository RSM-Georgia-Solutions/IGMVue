<template>
    <v-form>
    
        <v-container fluid>
               
          
    
                <new-building-header></new-building-header>

                <h1>{{Building.floor}}</h1>

                    <v-btn class="primary" @click="AddNewFloor"> 
                    <v-icon>add</v-icon>
                    add floor</v-btn>

                <building-floors v-for="floor in Building.floors" v-model="Building.floors" :key="floor.floor"></building-floors>
                
         
            <v-layout row justify-center>

                
    
                <v-btn color="primary" dark @click="dialog = true">Open Dialog 1</v-btn>
    
                <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
    
                    <v-card tile>
    
                        <v-toolbar card dark color="primary">
    
                            <v-btn icon dark @click.native="dialog = false">
    
                                <v-icon>close</v-icon>
    
                            </v-btn>
    
                            <v-toolbar-title>Settings</v-toolbar-title>
    
                            <v-spacer></v-spacer>
    
                            <v-toolbar-items>
    
                                <v-btn dark flat @click.native="dialog = false">Save</v-btn>
    
                            </v-toolbar-items>
    
                        </v-toolbar>
    
                        <v-card-text>
    
                        </v-card-text>
    
                        <div style="flex: 1 1 auto;"></div>
    
                    </v-card>
    
                </v-dialog>
    
            </v-layout>
    
        </v-container>
    
        <div class="text-xs-center">
    
            <v-btn :loading="loading3" :disabled="loading3" color="blue-grey" class="white--text"    @click.native="loader = 'loading3' ; BindBuilding">
    
                <v-icon left>cloud_upload</v-icon>
    
                Upload
    
            </v-btn>
    
        </div>
    
    </v-form>
</template>

<script>
    import NewBuildingHeader from './NewBuildingHeader.vue'
    
    import Floors from './Floors.vue'
    import BuildingFloors from './BuildingFloors.vue'
    
    export default {
    
        components: {
    
            NewBuildingHeader,
    
            Floors,

            BuildingFloors
    
        },
    
        watch: {
    
            loader() {
    
                const l = this.loader
    
                this[l] = !this[l]
    
                setTimeout(() => (this[l] = false), 3000)
    
                this.loader = null
    
            }
    
        },
    
        data: () => ({
    
            title: "Image Upload",
    
            dialog: false,
    
            imageName: '',
    
            imageUrl: '',
    
            imageFile: '',
    
            loader: null,
    
            loading: false,
    
            loading2: false,
    
            loading3: false,
    
            loading4: false,
    
            dialog: false,
            Building:{
                branch:'1',
                image:'2',
            },

            Building: {
    
                        branch: 'ვაჟა',
    
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFtV26TrzDDse_Lb57HW8ns8XUMJgPTP8eNA7rX-51KK0Gu_tV',

                        floors: []
    
            }
    
        }),
    
        methods: {

            AddNewFloor(){
                this.Building.floors.push({
                    
                        floor : null,
                        secotor:[]
                    
                })
            },

            BindBuilding(){
                this.Buildings.push(this.Building);
            },
    
            pickFile() {
    
                this.$refs.image.click()
    
            },
    
            onFilePicked(e) {
    
                const files = e.target.files
    
                if (files[0] !== undefined) {
    
                    this.imageName = files[0].name
    
                    if (this.imageName.lastIndexOf('.') <= 0) {
    
                        return
    
                    }
    
                    const fr = new FileReader()
    
                    fr.readAsDataURL(files[0])
    
                    fr.addEventListener('load', () => {
    
                        this.imageUrl = fr.result
    
                        this.imageFile = files[0] // this is an image file that can be sent to server...
    
                    })
    
                } else {
    
                    this.imageName = ''
    
                    this.imageFile = ''
    
                    this.imageUrl = ''
    
                }
    
            }
    
        }
    
    }
</script>

<style>
    
</style>
