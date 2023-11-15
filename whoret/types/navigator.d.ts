import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

declare namespace Navigator {
  // auth stack navigation
  export type AuthStackParamsList = {
    signin: undefined;
    signup: undefined;
  };

  export type RootStackParamList = {
    // tab navigation
    root: NavigatorScreenParams<RootTabParamList> | undefined;
    // orders
    orders: undefined;
    orderDetails: {
      orderId: string;
    };
    orderUpdates: {
      orderId: string;
    };
    // others
    wishlist: string;
    editProfile: string;
    savedAddress: string;
  };

  export type RootTabParamList = {
    home: undefined;
    categories: undefined;
    notification: undefined;
    account: undefined;
    cart: undefined;
  };

  export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, Screen>;

  export type AuthStackScreenProps<Screen extends keyof AuthStackParamsList> =
    NativeStackScreenProps<AuthStackParamsList, Screen>;

  export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
    CompositeScreenProps<
      BottomTabScreenProps<RootTabParamList, Screen>,
      NativeStackScreenProps<RootStackParamList>
    >;
}
