'use client';

import React, { forwardRef, type ComponentPropsWithoutRef, type ElementType } from 'react';

const MOTION_PROPS = new Set([
  'initial',
  'animate',
  'exit',
  'variants',
  'transition',
  'whileHover',
  'whileTap',
  'whileFocus',
  'whileDrag',
  'whileDragEnd',
  'whileInView',
  'viewport',
  'layout',
  'layoutId',
  'custom',
  'inherit',
  'drag',
  'dragConstraints',
  'dragElastic',
  'dragMomentum',
  'dragPropagation',
  'dragTransition',
  'layoutScroll',
  'layoutDependency',
]);

const stripMotionProps = (props: Record<string, unknown> | undefined) => {
  if (!props) {
    return {};
  }
  const sanitized: Record<string, unknown> = {};
  Object.entries(props).forEach(([key, value]) => {
    if (MOTION_PROPS.has(key)) {
      return;
    }
    sanitized[key] = value;
  });
  return sanitized;
};

const createMotionComponent = (Component: ElementType = 'div') => {
  const MotionComponent = forwardRef<HTMLElement, ComponentPropsWithoutRef<any>>((props, ref) => {
    const sanitizedProps = stripMotionProps(props);
    return React.createElement(Component, { ...sanitizedProps, ref });
  });

  const componentName =
    typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Component';
  MotionComponent.displayName = `Motion(${componentName})`;

  return MotionComponent;
};

const elementCache = new Map<string | symbol, React.ComponentType<any>>();

// Create a proxy that acts as both a function and an object with element properties
const createMotionProxy = () => {
  const baseComponent = createMotionComponent('div');

  return new Proxy(baseComponent, {
    get: (target, key) => {
      if (key === 'create') {
        return createMotionComponent;
      }
      if (typeof key === 'string') {
        if (!elementCache.has(key)) {
          elementCache.set(key, createMotionComponent(key as ElementType));
        }
        return elementCache.get(key);
      }
      return (target as any)[key];
    },
    apply: (_, __, args) => {
      return createMotionComponent(args[0] as ElementType);
    },
  });
};

const motion = createMotionProxy() as any;

type AnimatePresenceProps = {
  children: React.ReactNode;
  [key: string]: unknown;
};

const AnimatePresence = ({ children }: AnimatePresenceProps) => <>{children}</>;

export { motion, AnimatePresence };
