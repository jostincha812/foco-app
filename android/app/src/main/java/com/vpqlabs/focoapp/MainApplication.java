package com.vpqlabs.focoapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.magus.fblogin.FacebookLoginPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.magus.fblogin.FacebookLoginPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.magus.fblogin.FacebookLoginPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.magus.fblogin.FacebookLoginPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.crash.RNFirebaseCrashPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
            new RNSpinkitPackage(),
            new RNI18nPackage(),
            new RNFirebasePackage(),
            new FacebookLoginPackage(),
            new VectorIconsPackage(),
            new RNSpinkitPackage(),
            new RNI18nPackage(),
            new RNFirebasePackage(),
            new FacebookLoginPackage(),
            new VectorIconsPackage(),
            new RNSpinkitPackage(),
            new RNI18nPackage(),
            new RNFirebasePackage(),
            new FacebookLoginPackage(),
            new RNI18nPackage(),
            new FacebookLoginPackage(),
          new RNFirebasePackage(),
          new RNFirebaseAnalyticsPackage(),
          new RNFirebaseAuthPackage(),
          new RNFirebaseCrashPackage(),
          new RNFirebaseDatabasePackage(),
          new VectorIconsPackage(),
          new RNSpinkitPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
