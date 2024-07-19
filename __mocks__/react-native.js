// __mocks__/react-native.js

const React = require('react');
const { View, Text, Image, ImageBackground, TouchableOpacity, Animated, StyleSheet } = require('react-native');

module.exports = {
  ...React,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
  StyleSheet: {
    create: jest.fn((styles) => styles),
  },
};
