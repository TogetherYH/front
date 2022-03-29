import { debounce } from 'lodash';
import React, { Component } from 'react';
import { BasicNode, BasicNodesAndRels, BasicRelationship } from './common';
import { Graph } from './GraphVisualizer/Graph/Graph';
import { GraphModel } from './models/Graph';
import { GraphStyleModel } from './models/GraphStyle';
import { NodeModel } from './models/Node';
import { StyledFullSizeContainer } from './styled';
import { GetNodeNeighboursFn, VizItem } from './types';
import { GraphStats } from './utils/mapper';

// type GraphVisualizerDefaultProps = {
//   // initialNodeDisplay: number
//   // maxNeighbours: number
//   // updateStyle: (style: any) => void
//   // isFullscreen: boolean
//   // assignVisElement: (svgElement: any, graphElement: any) => void
//   // getAutoCompleteCallback: (
//   //   callback: (rels: BasicRelationship[]) => void
//   // ) => void
//   // setGraph: (graph: GraphModel) => void
//   // hasTruncatedFields: boolean
//   // nodePropertiesExpandedByDefault: boolean
//   // setNodePropertiesExpandedByDefault: (expandedByDefault: boolean) => void
//   // wheelZoomInfoMessageEnabled: boolean
//   // disableWheelZoomInfoMessage: () => void
// }
type GraphVisualizerProps = {
  relationships: BasicRelationship[];
  nodes: BasicNode[];
  // initialNodeDisplay?: number
  // maxNeighbours?: number
  // graphStyleData?: any
  // getNeighbours?: (
  //   id: string,
  //   currentNeighbourIds: string[] | undefined
  // ) => Promise<BasicNodesAndRels & { allNeighboursCount: number }>
  // updateStyle?: (style: any) => void
  isFullscreen: boolean;
  // assignVisElement?: (svgElement: any, graphElement: any) => void
  // getAutoCompleteCallback?: (
  //   callback: (rels: BasicRelationship[]) => void
  // ) => void
  // setGraph?: (graph: GraphModel) => void
  // hasTruncatedFields?: boolean
  // nodePropertiesExpandedByDefault?: boolean
  // setNodePropertiesExpandedByDefault?: (expandedByDefault: boolean) => void
  // wheelZoomInfoMessageEnabled?: boolean
  // disableWheelZoomInfoMessage?: () => void
  // DetailsPaneOverride?: React.FC<DetailsPaneProps>
  // OverviewPaneOverride?: React.FC<OverviewPaneProps>
};

type GraphVisualizerState = {
  initialNodeDisplay: number;
  maxNeighbours: number;
  updateStyle: (style: any) => void;
  // isFullscreen: boolean
  assignVisElement: (svgElement: any, graphElement: any) => void;
  getAutoCompleteCallback: (
    callback: (rels: BasicRelationship[]) => void,
  ) => void;
  setGraph: (graph: GraphModel) => void;
  graph: GraphModel;
  hasVis: boolean;
  autoCompleteRelationships: (
    existingNodes: { id: string }[],
    newNodes: { id: string }[],
  ) => void;
  hasTruncatedFields: boolean;
  nodePropertiesExpandedByDefault: boolean;
  setNodePropertiesExpandedByDefault: (expandedByDefault: boolean) => void;
  wheelZoomInfoMessageEnabled: boolean;
  disableWheelZoomInfoMessage: () => void;

  //////////////////////////////
  // relationships: BasicRelationship[]
  // nodes: BasicNode[]
  // graphStyleData: {}

  /////////////////////////

  graphStyle: GraphStyleModel;
  hoveredItem: VizItem;
  nodes: BasicNode[];
  relationships: BasicRelationship[];
  selectedItem: VizItem;
  stats: GraphStats;
  styleVersion: number;
  freezeLegend: boolean;
  width: number;
  nodePropertiesExpanded: boolean;
};

export class G2 extends Component<GraphVisualizerProps, GraphVisualizerState> {
  visElement: null | {
    svgElement: unknown;
    graphElement: unknown;
    type: 'plan' | 'graph';
  } = null;

  // state: GraphVisualizerState = {
  //   initialNodeDisplay: 0,
  //   maxNeighbours: 25,
  //   updateStyle: (graphStyleData: any) => {
  //     // dispatch(grassActions.updateGraphStyleData(graphStyleData))
  //   },
  //   isFullscreen: false,
  //   assignVisElement: (svgElement: any, graphElement: any) => {
  //     this.visElement = { svgElement, graphElement, type: 'plan' }
  //     this.setState({ hasVis: true })
  //   },
  //   getAutoCompleteCallback: (
  //     callback: (rels: BasicRelationship[]) => void
  //   ) => {},
  //   setGraph(graph: GraphModel): void {
  //     this.graph = graph
  //     this.autoCompleteRelationships([], this.graph.nodes())
  //   },
  //   autoCompleteRelationships(
  //     existingNodes: { id: string }[],
  //     newNodes: { id: string }[]
  //   ): void {
  //     // if (this.props.autoComplete) {
  //     //   const existingNodeIds = existingNodes.map(node => parseInt(node.id))
  //     //   const newNodeIds = newNodes.map(node => parseInt(node.id))

  //     //   this.getInternalRelationships(existingNodeIds, newNodeIds)
  //     //     .then(graph => {
  //     //       this.autoCompleteCallback &&
  //     //         this.autoCompleteCallback(graph.relationships)
  //     //     })
  //     //     .catch(() => undefined)
  //     // } else {
  //     //   this.autoCompleteCallback && this.autoCompleteCallback([])
  //     // }
  //   },
  //   hasTruncatedFields: false,
  //   nodePropertiesExpandedByDefault: false,
  //   setNodePropertiesExpandedByDefault: (expandedByDefault: boolean) =>
  //   {
  //     // dispatch(setNodePropertiesExpandedByDefault(expandedByDefault)),
  //   },
  //   wheelZoomInfoMessageEnabled: false,
  //   disableWheelZoomInfoMessage: () => {
  //     // dispatch(updateSettings({ showWheelZoomInfo: false }))
  //   },

  //   //////////////////////////////
  //   nodes: [
  //     {
  //       id: '1',
  //       labels: ['a1', 'b1'],
  //       properties: {
  //         name: '1'
  //       },
  //       propertyTypes: {
  //         value: '1'
  //       }
  //     },
  //     {
  //       id: '2',
  //       labels: ['a2', 'b2'],
  //       properties: {
  //         name: '2'
  //       },
  //       propertyTypes: {
  //         value: '2'
  //       }
  //     }
  //   ],
  //   relationships: [

  //   ],
  //   // graphStyleData: grassActions.getGraphStyleData(state),

  //   //////////////////////////
  //   graph: new GraphModel,
  //   hasVis: true,
  //   // hoveredItem: {type: '', item: },
  //   // selectedItem: {},
  // }

  constructor(props: any) {
    super(props);
    this.setState({
      initialNodeDisplay: 0,
      maxNeighbours: 25,
      updateStyle: (graphStyleData: any) => {
        // dispatch(grassActions.updateGraphStyleData(graphStyleData))
      },
      // isFullscreen: false,
      assignVisElement: (svgElement: any, graphElement: any) => {
        this.visElement = { svgElement, graphElement, type: 'plan' };
        this.setState({ hasVis: true });
      },
      getAutoCompleteCallback: (
        callback: (rels: BasicRelationship[]) => void,
      ) => {},
      setGraph(graph: GraphModel): void {
        // this.setState({graph: graph})
        // this.autoCompleteRelationships([], this.graph.nodes())
      },
      autoCompleteRelationships(
        existingNodes: { id: string }[],
        newNodes: { id: string }[],
      ): void {
        // if (this.props.autoComplete) {
        //   const existingNodeIds = existingNodes.map(node => parseInt(node.id))
        //   const newNodeIds = newNodes.map(node => parseInt(node.id))
        //   this.getInternalRelationships(existingNodeIds, newNodeIds)
        //     .then(graph => {
        //       this.autoCompleteCallback &&
        //         this.autoCompleteCallback(graph.relationships)
        //     })
        //     .catch(() => undefined)
        // } else {
        //   this.autoCompleteCallback && this.autoCompleteCallback([])
        // }
      },
      hasTruncatedFields: false,
      nodePropertiesExpandedByDefault: false,
      setNodePropertiesExpandedByDefault: (expandedByDefault: boolean) => {
        // dispatch(setNodePropertiesExpandedByDefault(expandedByDefault)),
      },
      wheelZoomInfoMessageEnabled: false,
      disableWheelZoomInfoMessage: () => {
        // dispatch(updateSettings({ showWheelZoomInfo: false }))
      },

      //////////////////////////////
      nodes: [
        {
          id: '1',
          labels: ['a1', 'b1'],
          properties: {
            name: '1',
          },
          propertyTypes: {
            value: '1',
          },
        },
        {
          id: '2',
          labels: ['a2', 'b2'],
          properties: {
            name: '2',
          },
          propertyTypes: {
            value: '2',
          },
        },
      ],
      relationships: [],
      // graphStyleData: grassActions.getGraphStyleData(state),

      //////////////////////////
      graph: new GraphModel(),
      hasVis: true,
      // hoveredItem: {type: '', item: },
      // selectedItem: {},
    });
  }

  getNodeNeighbours: GetNodeNeighboursFn = (
    node,
    currentNeighbourIds,
    callback,
  ) => {
    if (currentNeighbourIds.length > this.state.maxNeighbours) {
      callback({ nodes: [], relationships: [] });
    }
    // if (this.props.getNeighbours) {
    //   this.props.getNeighbours(node.id, currentNeighbourIds).then(
    //     ({ nodes, relationships, allNeighboursCount }) => {
    //       if (allNeighboursCount > this.state.maxNeighbours) {
    //         this.setState({
    //           selectedItem: {
    //             type: 'status-item',
    //             item: `Rendering was limited to ${this.state.maxNeighbours} of the node's total ${allNeighboursCount} neighbours due to browser config maxNeighbours.`
    //           }
    //         })
    //       }
    //       callback({ nodes, relationships })
    //     },
    //     () => {
    //       callback({ nodes: [], relationships: [] })
    //     }
    //   )
    // }
  };

  onItemMouseOver(item: VizItem): void {
    this.setHoveredItem(item);
  }

  mounted = true;
  setHoveredItem = debounce((hoveredItem: VizItem) => {
    if (this.mounted) {
      this.setState({ hoveredItem });
    }
  }, 200);

  onItemSelect(selectedItem: VizItem): void {
    this.setState({ selectedItem });
  }

  onGraphModelChange(stats: GraphStats): void {
    this.setState({ stats });
    if (this.state.updateStyle) {
      this.state.updateStyle(this.state.graphStyle.toSheet());
    }
  }

  componentWillUnmount(): void {
    console.log('................');
    this.setState({
      nodes: [
        {
          id: '1',
          labels: ['a1', 'b1'],
          properties: {
            name: '1',
          },
          propertyTypes: {
            value: '1',
          },
        },
        {
          id: '2',
          labels: ['a2', 'b2'],
          properties: {
            name: '2',
          },
          propertyTypes: {
            value: '2',
          },
        },
      ],
    });
  }

  render(): JSX.Element {
    // This is a workaround to make the style reset to the same colors as when starting the browser with an empty style
    // If the legend component has the style it will ask the neoGraphStyle object for styling before the graph component,
    // and also doing this in a different order from the graph. This leads to different default colors being assigned to different labels.
    // const graphStyle = this.state.freezeLegend
    //   ? new GraphStyleModel()
    //   : this.state.graphStyle

    return (
      <StyledFullSizeContainer id="svg-vis">
        <Graph
          isFullscreen={this.props.isFullscreen}
          relationships={this.props.relationships}
          nodes={this.state.nodes}
          getNodeNeighbours={this.getNodeNeighbours.bind(this)}
          onItemMouseOver={this.onItemMouseOver.bind(this)}
          onItemSelect={this.onItemSelect.bind(this)}
          graphStyle={this.state.graphStyle}
          styleVersion={this.state.styleVersion} // cheap way for child to check style updates
          onGraphModelChange={this.onGraphModelChange.bind(this)}
          assignVisElement={this.state.assignVisElement}
          getAutoCompleteCallback={this.state.getAutoCompleteCallback}
          setGraph={this.state.setGraph}
          offset={
            (this.state.nodePropertiesExpanded ? this.state.width : 0) + 8
          }
          wheelZoomInfoMessageEnabled={this.state.wheelZoomInfoMessageEnabled}
          disableWheelZoomInfoMessage={this.state.disableWheelZoomInfoMessage}
        />
      </StyledFullSizeContainer>
    );
  }
}
