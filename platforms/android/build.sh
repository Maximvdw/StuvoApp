phonegap cordova build
cd ./cordova
./build --release
cd ../ant-build/
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore CordovaApp-release-unsigned.apk alias_name

