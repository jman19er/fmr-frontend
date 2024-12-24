import { FlatList, ListRenderItemInfo, View } from "react-native";
import { useAppContext } from "./AppContext";

interface SavedComponentProps<T> {
    saved: T[];
    renderItem: (args: { item: T; navigation: any; contextData: any }) => JSX.Element;
    keyExtractor: (item: T) => string;
    navigation: any;
};

const SavedComponent = <T,>({ saved, renderItem, keyExtractor, navigation }: SavedComponentProps<T> ) => {
    const { ...contextData } = useAppContext();

    return (
        <View>
            <FlatList
                data={saved}
                renderItem={({ item }: ListRenderItemInfo<T>) =>
                    // pass contextData into your custom renderItem
                    renderItem({ item, navigation, contextData })
                  }
                keyExtractor={(item: T, index: number) => keyExtractor(item)}
            />
        </View>
    );
};

export default SavedComponent;