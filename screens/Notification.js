import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    ImageBackground,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

// --- Data Structure ---
const initialNotifications = [
    {
        id: '1',
        type: 'invitation',
        userName: 'Sato Misaki',
        userImage: require('../images/female.jpg'),
        collectionName: 'Top 10 cafes in osaka',
        timestamp: '1d',
        status: 'pending',
    },
    {
        id: '2',
        type: 'invitation',
        userName: 'Kenji Tanaka',
        userImage: require('../images/ocean.jpg'),
        collectionName: 'Kyoto Hidden Gems',
        timestamp: '2d',
        status: 'pending',
    },
    {
        id: '3',
        type: 'confirmation',
        userName: 'Yuki',
        userImage: require('../images/female.jpg'),
        collectionName: 'Top 10 places in japan',
        timestamp: '3d',
    },
];

const NotificationItem = ({ item, onAccept, onDeny }) => {
    const renderInvitationActions = () => {
        if (item.status === 'accepted') {
            return (
                <View className="w-[130px] flex-row items-center justify-center bg-zinc-800 border border-zinc-700 py-2 rounded-full gap-x-2">
                    <Ionicons name="checkmark" size={20} color="white" />
                    <Text className="text-white font-semibold text-sm">Accepted</Text>
                </View>
            );
        }

        if (item.status === 'denied') {
            return <Text className="text-red-500 font-semibold">Invitation Denied</Text>;
        }

        return (
            <View className="flex-row items-center gap-x-3">
                <TouchableOpacity
                    onPress={() => onDeny(item.id)}
                    className="bg-gray-200 py-2 px-6 rounded-full"
                >
                    <Text className="text-black font-semibold text-sm">Deny</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => onAccept(item.id)}
                    className="bg-[#111013] py-2 px-6 rounded-full"
                >
                    <Text className="text-white font-semibold text-sm">Accept</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View className="py-4 px-3">
            <View className="flex-row gap-x-3">
                <Image source={item.userImage} className="w-10 h-10 rounded-full" />
                <View className="flex-1">
                    <View className="flex-row justify-between items-start">
                        <Text className="text-white text-base leading-snug flex-1 pr-2">
                            <Text>'{item.userName}'</Text>
                            {item.type === 'invitation' ? (
                                <>
                                    <Text> has added you in the collection </Text>
                                    <Text>'{item.collectionName}'</Text>
                                    <Text> as a companion</Text>
                                </>
                            ) : (
                                <>
                                    <Text> accepted your invite and is now a companion in</Text>
                                    <Text>{item.collectionName}</Text>
                                </>
                            )}
                        </Text>
                        <Text className="text-sm text-gray-500">{item.timestamp}</Text>
                    </View>

                    {item.type === 'invitation' && (
                        <View className="mt-3">
                            {renderInvitationActions()}
                        </View>
                    )}
                </View>
            </View>
            <View className="border-b border-gray-800 mt-4" />
        </View>
    );
};

export default function Notification({ navigation }) {
    const [notifications, setNotifications] = useState(initialNotifications);

    const handleAccept = (notificationId) => {
        setNotifications(currentNotifications =>
            currentNotifications.map(notif =>
                notif.id === notificationId ? { ...notif, status: 'accepted' } : notif
            )
        );
    };

    const handleDeny = (notificationId) => {
        setNotifications(currentNotifications =>
            currentNotifications.map(notif =>
                notif.id === notificationId ? { ...notif, status: 'denied' } : notif
            )
        );
    };

    const handleNext = () => navigation.navigate("Home");

    return (
        <SafeAreaView className="flex-1 bg-black" edges={['top']}>
            <ImageBackground className='flex-1'
                source={require('../images/background.png')}
                blurRadius={20}
            >
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View className="p-5 ">
                        <TouchableOpacity onPress={handleNext} className="bg-[#2D2D3A] w-12 h-12 rounded-full items-center justify-center">
                            <Feather name="chevron-left" size={28} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text className='text-[30px] mt-5 font-bold text-[#fff]'>Notification</Text>

                        {notifications.map((item) => (
                            <NotificationItem
                                key={item.id}
                                item={item}
                                onAccept={handleAccept}
                                onDeny={handleDeny}
                            />
                        ))}
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
});