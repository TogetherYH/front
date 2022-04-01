import { FC, useState, useRef, useEffect } from 'react';
import { Card } from 'antd';
import { GraphModel } from './models/Graph';
import { GraphEventHandlerModel } from './GraphVisualizer/Graph/GraphEventHandlerModel';
import { GraphStyleModel } from './models/GraphStyle';
import { BasicNode, BasicRelationship } from './common';
import { GraphStats, mapNodes, mapRelationships } from './utils/mapper';
import { Visualization } from './GraphVisualizer/Graph/visualization/Visualization';
import { StyledVisContainer } from './styled';
import { VizItem } from './types';
import { debounce } from 'lodash';
import { StyledSvgWrapper } from './GraphVisualizer/Graph/styled';
import './style.css';

interface G3Props {}

const G: FC<G3Props> = (props) => {
  const svgElement = useRef<SVGSVGElement>();

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [visualization, setVisualization] = useState<Visualization>();
  const [graph, setGraph] = useState<GraphModel>();
  const [nodes, setNodes] = useState<BasicNode[]>([]);
  const [relationships, setRelationships] = useState<BasicRelationship[]>([]);
  const [selectedItem, setSelectedItem] = useState<VizItem>();

  useEffect(() => {
    if (svgElement.current) {
      const ns = [
        {
          id: '1',
          labels: ['11'],
          properties: {
            name: '11',
          },
          propertyTypes: {
            value: '1',
          },
        },
        {
          id: '2',
          labels: ['22'],
          properties: {
            name: '22',
          },
          propertyTypes: {
            value: '2',
          },
        },
        {
          id: '3',
          labels: ['22'],
          properties: {
            name: '33',
          },
          propertyTypes: {
            value: '2',
          },
        },
        {
          id: '4',
          labels: ['22'],
          properties: {
            name: '44',
          },
          propertyTypes: {
            value: '2',
          },
        },
        {
          id: '5',
          labels: ['22'],
          properties: {
            name: '55',
          },
          propertyTypes: {
            value: '2',
          },
        },
      ];
      setNodes(ns);

      const r = [
        {
          id: '12',
          startNodeId: '1',
          endNodeId: '2',
          type: '4',
          properties: {},
          propertyTypes: {},
        },
        {
          id: '13',
          startNodeId: '1',
          endNodeId: '3',
          type: '4',
          properties: {},
          propertyTypes: {},
        },
        {
          id: '14',
          startNodeId: '1',
          endNodeId: '4',
          type: '4',
          properties: {},
          propertyTypes: {},
        },
        {
          id: '15',
          startNodeId: '1',
          endNodeId: '5',
          type: '4',
          properties: {},
          propertyTypes: {},
        },
      ];

      setRelationships(r);

      setGraph(createGraph(ns, r));
    }
  }, [svgElement]);

  useEffect(() => {
    if (graph) {
      // console.log('ss', svgElement.current);
      // console.log('mm', measureSize);
      // console.log('gg', graph);
      // console.log('ii', isFullscreen);
      setVisualization(
        new Visualization(
          svgElement.current,
          measureSize,
          // this.handleZoomEvent,
          // this.handleDisplayZoomWheelInfoMessage,
          graph,
          new GraphStyleModel(),
          isFullscreen,
        ),
      );

      // console.log('vv', visualization);
    }
  }, [graph]);

  useEffect(() => {
    if (graph && visualization) {
      const graphEventHandler = new GraphEventHandlerModel(
        graph,
        visualization,
        // getNodeNeighbours,
        // onItemMouseOver,
        onItemSelect,
        // onGraphModelChange
      );
      graphEventHandler.bindEventHandlers();

      visualization?.init();
    }
  }, [visualization]);

  const createGraph = (
    nodes: BasicNode[],
    relationships: BasicRelationship[],
  ): GraphModel => {
    // console.log('createGraph...', nodes, relationships);
    const graph = new GraphModel();
    graph.addNodes(mapNodes(nodes));
    graph.addRelationships(mapRelationships(relationships, graph));
    // console.log('createGraph end', graph);
    return graph;
  };

  const measureSize = () => ({
    width: svgElement.current?.parentElement?.clientWidth ?? 200,
    height: svgElement.current?.parentElement?.clientHeight ?? 200,
  });

  // const onItemMouseOver = (item: VizItem) => {
  //   this.setHoveredItem(item)
  // }

  // const setHoveredItem = debounce((hoveredItem: VizItem) => {
  //   if (this.mounted) {
  //     this.setState({ hoveredItem })
  //   }
  // }, 200)

  const onItemSelect = (selectedItem: VizItem) => {
    setSelectedItem(selectedItem);
  };

  // const onGraphModelChange = (stats: GraphStats) => {
  //   this.setState({ stats })
  //   if (this.props.updateStyle) {
  //     this.props.updateStyle(this.state.graphStyle.toSheet())
  //   }
  // }

  return (
    <Card>
      <StyledVisContainer isFullscreen={false}>
        <StyledSvgWrapper>
          <svg className="neod3viz" ref={svgElement} />
        </StyledSvgWrapper>
      </StyledVisContainer>
    </Card>
  );
};

export default G;
