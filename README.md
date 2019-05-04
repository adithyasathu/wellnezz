

Generate icons from image

Place the image in root directory as of App_resources and run the below commands

tns resources generate icons wellness.png

Generate logo and transparent background from image

tns resources generate splashes wellness.png --background "#00000000"

tns resources generate splashes background.png --background "#FFFFFF"

https://developers.facebook.com/apps/367394424118545/settings/basic/

https://classroom.udacity.com/courses/ud0352

https://blog.realworldfullstack.io/real-world-app-part-25-a-nativescript-and-angular-e9ff4b102e9b

IMP: https://github.com/anihalaney/rwa-trivia

https://github.com/EddyVerbruggen/nativescript-plugin-firebase-demo/tree/ad85e187dbbb12ef0e705d1bfaed90c702846bc4

https://github.com/NativeScript/nativescript-sdk-examples-ng/tree/master/app

https://github.com/NickIliev/NativeScript-Firebase-Auth/blob/master/app/view-models/auth-view-model.ts

pixlr editor: https://smallbusiness.chron.com/make-two-layer-images-one-pixlr-editor-74161.html


npm config set registry https://artifactory.tattsgroup.com/artifactory/api/npm/gaming-maxsys


npm config set registry  "https://registry.npmjs.org"


Nativescript notes

Build failure for android

 the error application entry point file not found is often related to the fact that the source JS files are not present in the build application (in /platform/android/app/src/main/assets/app). This might happen due to a number of reasons. My suggestion is to try a clean rebuild.


rm -rf node_modules platforms hooks
// also remove webpack.config.js but do not forget to add the extended activity later in the newly generated one
npm i
// perhaps add the extended activity in the generated webpack.config.js
tns platform add android
tns build android
tns run android --bundle


Firebase post install completed. To re-run this script, navigate to the root directory of `nativescript-plugin-firebase` in your `node_modules` folder and run: `npm run config`.


path to the node_modules/nativescript-plugin-firebase and run npm run setup? Try that, then tns run android and the build should work. Works 100% of the time for me after figuring this out.
