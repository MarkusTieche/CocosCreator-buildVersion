# Cocos Creator build-version

Build version is a custom Cocos Creator package to extend the build process. 
It will increment the build number every time the project is built for any target.  

## about build-version
If you upload your build to any app store ( iOs Store, googlePlay ) you have to provide a unique build-version while the software version( e.g. 1.0.0 ) can stay the same. This package will take care of the build-version and applies the current build-version automatically to the build targets. These are in iOs( Info.plist ) and on android( app/build.gradle ).  
This package also keeps track of the build history which you can check in the package folder( bin/data.json ).

About build verison:  
Android: https://developer.android.com/studio/publish/versioning  
  iOs: https://developer.apple.com/library/archive/technotes/tn2420/_index.html

## how to use
- Install  
Copy the build-version folder to the package folder in your project


- Uninstall  
Simply remove the build-version folder from packages

__You can add or remove this package at any given point__

## More about packaging in Cocos Creator
- https://docs.cocos2d-x.org/creator/manual/en/extension/your-first-extension.html
- https://docs.cocos2d-x.org/creator/manual/en/publish/custom-project-build-template.html
- (demo) https://github.com/cocos-creator/demo-process-build-textures
