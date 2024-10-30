import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { RichText, Toolbar, useEditorBridge } from '@10play/tentap-editor';

const EditorScreen = () => {

  const [pageContent,setPageContent] = useState('');

  console.log("component Rendered");
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    pageContent: pageContent,
  });

  return (
    <SafeAreaView style={exampleStyles.fullScreen}>
      <RichText editor={editor}/>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={exampleStyles.keyboardAvoidingView}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const exampleStyles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    margin:10,
  },
  keyboardAvoidingView: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
});

export default EditorScreen;