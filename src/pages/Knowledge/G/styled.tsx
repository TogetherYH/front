/*
 * Copyright (c) "Neo4j"
 * Neo4j Sweden AB [http://neo4j.com]
 *
 * This file is part of Neo4j.
 *
 * Neo4j is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import styled from 'styled-components';
import { Resizable } from 'react-resizable';

export const panelMinWidth = 200;

export const StyledFullSizeContainer = styled.div`
  position: relative;
  height: 100%;
`;
export const StyledNodeInspectorContainer = styled.div<{
  width: number;
  shouldAnimate: boolean;
}>`
  position: absolute;
  right: 0;
  top: 3px;
  z-index: 1;
  width: ${(props) => props.width}px;
  ${(props) => props.shouldAnimate && 'transition: 0.2s ease-out;'}
  max-width: 95%;
  height: 100%;
  background: ${(props) => props.theme.editorBackground};
  color: ${(props) => props.theme.primaryText};
  font-family: ${(props) => props.theme.drawerHeaderFontFamily};
  box-shadow: ${(props) => props.theme.standardShadow};
`;
export const StyledNodeInspectorTopMenuChevron = styled.div<{
  expanded: boolean;
}>`
  cursor: pointer;
  position: absolute;
  right: 0px;
  top: 6px;
  z-index: 2;
  width: 32px;
  height: 32px;
  padding: 6px;
  color: ${(props) => props.theme.frameNodePropertiesPanelIconTextColor};
  text-align: center;
  ${(props) =>
    !props.expanded &&
    `background: ${props.theme.editorBackground};
       box-shadow: ${props.theme.standardShadow};
    `}
`;

export const PaneContainer = styled.div`
  padding: 0 14px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const PaneHeader = styled.div`
  font-size: 16px;
  margin-top: 10px;
  flex: 0 0 auto;
`;

export const PaneBody = styled.div`
  overflow: auto;
  margin: 14px 0;
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const PaneTitle = styled.div`
  margin-bottom: 10px;
`;

export const StyledResizable = styled(Resizable)`
  .react-resizable {
    position: relative;
  }
  .react-resizable-handle {
    position: absolute;
    width: 20px;
    height: 100%;
    box-sizing: border-box;
    padding: 0 3px 3px 0;
  }
  .react-resizable-handle-sw {
    bottom: 0;
    left: 0;
    cursor: sw-resize;
    transform: rotate(90deg);
  }
  .react-resizable-handle-se {
    bottom: 0;
    right: 0;
    cursor: se-resize;
  }
  .react-resizable-handle-nw {
    top: 0;
    left: 0;
    cursor: nw-resize;
    transform: rotate(180deg);
  }
  .react-resizable-handle-ne {
    top: 0;
    right: 0;
    cursor: ne-resize;
    transform: rotate(270deg);
  }
  .react-resizable-handle-w,
  .react-resizable-handle-e {
    cursor: ew-resize;
  }
  .react-resizable-handle-w {
    left: 0;
    top: 0;
  }
  .react-resizable-handle-e {
    right: 0;
  }
  .react-resizable-handle-n,
  .react-resizable-handle-s {
    left: 50%;
    margin-left: -10px;
    cursor: ns-resize;
  }
  .react-resizable-handle-n {
    top: 0;
    transform: rotate(225deg);
  }
  .react-resizable-handle-s {
    bottom: 0;
    transform: rotate(45deg);
  }
`;

export const dim = {
  // Editor bar
  editorbarHeight: 71,
  // Frame
  frameBodyHeight: 550,
  frameTitlebarHeight: 41,
  frameStatusbarHeight: 39,
  frameBodyPadding: 20,
  frameButtonWidth: 41,
};

export const StyledVisContainer = styled.div<{ isFullscreen: boolean }>`
  width: 100%;
  height: ${(props) =>
    props.isFullscreen
      ? '100%'
      : dim.frameBodyHeight - dim.frameTitlebarHeight * 2 + 'px'};
  > svg {
    width: 100%;
  }
  > .neod3viz .node .ring {
    fill: none;
    opacity: 0;
    stroke: #6ac6ff;
  }
  > .neod3viz .node.selected .ring {
    stroke: #fdcc59;
  }
  > .neod3viz .node.selected:hover .ring {
    stroke: #6ac6ff;
  }
  > .neod3viz .node:hover .ring,
  > .neod3viz .node.selected .ring {
    opacity: 0.3;
  }
  > .neod3viz .relationship .overlay {
    opacity: 0;
    fill: #6ac6ff;
  }
  > .neod3viz .relationship.selected .overlay {
    fill: #fdcc59;
  }
  > .neod3viz .relationship.selected:hover .overlay {
    fill: #6ac6ff;
  }
  > .neod3viz .relationship:hover .overlay,
  > .neod3viz .relationship.selected .overlay {
    opacity: 0.3;
  }

  > .neod3viz .remove_node,
  .expand_node:hover {
    border: 2px #000 solid;
  }

  > .neod3viz .outline,
  .neod3viz .ring,
  .neod3viz .context-menu-item {
    cursor: pointer;
  }

  > .context-menu-item:hover {
    fill: #b9b9b9;
    font-size: 14px;
  }

  > path.context-menu-item {
    stroke-width: 2px;
    fill: #d2d5da;
  }

  > text.context-menu-item {
    fill: #fff;
    text-anchor: middle;
    pointer-events: none;
    font-size: 14px;
  }
`;
