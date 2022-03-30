import { FC, useState, useRef, useEffect } from 'react';
import { GraphModel } from './models/Graph';
import { GraphStyleModel } from './models/GraphStyle';
import { BasicNode, BasicRelationship } from './common';
import { mapNodes, mapRelationships } from './utils/mapper';
import { Visualization } from './GraphVisualizer/Graph/visualization/Visualization';
import { StyledVisContainer } from './styled';

interface G3Props {}

const G3: FC<G3Props> = (props) => {
  const svgElement = useRef<SVGSVGElement>();

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [visualization, setVisualization] = useState<Visualization>();
  const [graph, setGraph] = useState<GraphModel>();
  const [nodes, setNodes] = useState<BasicNode[]>([]);
  const [relationships, setRelationships] = useState<BasicRelationship[]>([]);

  useEffect(() => {
    if (svgElement.current) {
      const ns = [
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
      ];
      setNodes(ns);

      setGraph(createGraph(ns, relationships));
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

      console.log('vv', visualization);
    }
  }, [graph]);

  useEffect(() => {
    if (visualization) {
      visualization?.init();
    }
  }, [visualization]);

  const createGraph = (
    nodes: BasicNode[],
    relationships: BasicRelationship[],
  ): GraphModel => {
    console.log('createGraph...', nodes, relationships);
    const graph = new GraphModel();
    graph.addNodes(mapNodes(nodes));
    graph.addRelationships(mapRelationships(relationships, graph));
    console.log('createGraph end', graph);
    return graph;
  };

  const measureSize = () => ({
    width: svgElement.current?.parentElement?.clientWidth ?? 200,
    height: svgElement.current?.parentElement?.clientHeight ?? 200,
  });

  console.log('ss', svgElement);

  return (
    // <StyledVisContainer isFullscreen={true}>
    <svg className="neod3viz" ref={svgElement} />
    // </StyledVisContainer>
  );
};

export default G3;
