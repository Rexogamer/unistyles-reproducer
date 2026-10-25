/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useState } from 'react';
import { Pressable, StatusBar, Text, useColorScheme, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import Markdown, {
  hasParents,
  MarkdownIt,
} from '@rexovolt/react-native-markdown-display';

const defaultMarkdownIt = MarkdownIt({ linkify: true }).disable(['image']);

const codeRule = {
  /* @ts-expect-error these are untyped */
  code_inline: (node, children, parent, styles, inheritedStyles = {}) => {
    const isInList = hasParents(parent, 'list_item');
    return (
      <View
        key={node.key}
        style={[
          styles.code_inline_container,
          isInList && styles.code_inline_container_list,
        ]}
      >
        <Text
          key={node.key + 'inner'}
          style={[inheritedStyles, styles.code_inline]}
        >
          {node.content}
        </Text>
      </View>
    );
  },
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </>
  );
}

function AppContent() {
  const [showMD, setShowMD] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setShowMD(show => !show)} style={styles.button}>
        <Text style={styles.text}>show markdown</Text>
      </Pressable>
      {showMD && (
        <Markdown
          markdownit={defaultMarkdownIt}
          style={markdownStyles}
          rules={codeRule}
        >
          *test* **test** ~~test~~ `test`
        </Markdown>
      )}
    </View>
  );
}

const styles = StyleSheet.create((_currentTheme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    paddingTop: rt.insets.top,
    paddingBottom: rt.insets.bottom,
    paddingInline: 8,
  },
  button: {
    backgroundColor: '#2c2c2c',
    padding: 8,
    borderRadius: 8,
    marginBlockEnd: 4,
  },
  text: {
    color: '#f0f0f0',
  },
}));

const markdownStyles = StyleSheet.create(() => ({
  body: {
    color: '#f0f0f0',
  },
  strong: {
    fontWeight: 'bold',
  },
  em: {
    fontStyle: 'italic',
  },
  s: {
    textDecorationLine: 'line-through',
  },
  code_inline: {
    fontFamily: 'monospace',
    backgroundColor: 'transparent',
    padding: 0,
    borderWidth: 0,
    marginBlock: 0,
  },
  code_inline_container: {
    // align it properly (see also https://github.com/facebook/react-native/issues/31955)
    transform: [
      {
        translateY: 6,
      },
    ],
    backgroundColor: '#2c2c2c',
    paddingHorizontal: 2,
    borderRadius: 4,
  },
  code_inline_container_list: {
    transform: [],
  },
}));

export default App;
