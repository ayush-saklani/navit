import jsgraphs from 'js-graph-algorithms';

const g = new jsgraphs.WeightedDiGraph(550);

g.addEdge(new jsgraphs.Edge(0  , 1 , 2)); 
g.addEdge(new jsgraphs.Edge(1  , 2 , 2)); 
g.addEdge(new jsgraphs.Edge(2  , 3 , 2)); 
g.node(0).label='30.2731289,77.9997726,0';  
g.node(1).label='30.2732541,77.9998359,0';  
g.node(2).label='30.2733582,77.9999662,0';  
g.node(3).label='30.2734329,78.0001123,0'; 
//lat long floor no 
//23-11-2023    updated with new graph
//26-01-2023    below graph is commented and will be uncommmented after nodes coordinates are  filled
// till than new testing nodes are typed above do the same format for below files
// g.addEdge(new jsgraphs.Edge(0  , 1  , 4.5)); 
// g.addEdge(new jsgraphs.Edge(1  , 26 , 2  )); 
// g.addEdge(new jsgraphs.Edge(26 , 27 , 5  )); 
// g.addEdge(new jsgraphs.Edge(27 , 29 , 4  )); 
// g.addEdge(new jsgraphs.Edge(27 , 28 , 5  )); 
// g.addEdge(new jsgraphs.Edge(28 , 2  , 2  )); 
// g.addEdge(new jsgraphs.Edge(2  , 25 , 4.5)); 
// g.addEdge(new jsgraphs.Edge(1  , 30 , 2.8)); 
// g.addEdge(new jsgraphs.Edge(30 , 3  , 2.8)); 
// g.addEdge(new jsgraphs.Edge(3  , 4  , 4.2)); 
// g.addEdge(new jsgraphs.Edge(4  , 5  , 3.6)); 
// g.addEdge(new jsgraphs.Edge(5  , 6  , 2.8)); 
// g.addEdge(new jsgraphs.Edge(6  , 7  , 4.1)); 
// g.addEdge(new jsgraphs.Edge(7  , 8  , 4.1)); 
// g.addEdge(new jsgraphs.Edge(8  , 9  , 2.8)); 
// g.addEdge(new jsgraphs.Edge(9  , 10 , 3.6)); 
// g.addEdge(new jsgraphs.Edge(10 , 11 , 4.2)); 
// g.addEdge(new jsgraphs.Edge(11 , 31 , 2.8)); 
// g.addEdge(new jsgraphs.Edge(31 , 2  , 2.8)); 
// g.addEdge(new jsgraphs.Edge(7  , 12 , 4  )); 
// g.addEdge(new jsgraphs.Edge(12 , 13 , 1  )); 
// g.addEdge(new jsgraphs.Edge(13 , 14 , 5  )); 
// g.addEdge(new jsgraphs.Edge(14 , 23 , 5  )); 
// g.addEdge(new jsgraphs.Edge(23 , 16 , 4  )); 
// g.addEdge(new jsgraphs.Edge(13 , 15 , 5  )); 
// g.addEdge(new jsgraphs.Edge(15 , 24 , 5  )); 
// g.addEdge(new jsgraphs.Edge(24 , 17 , 4  )); 
// g.addEdge(new jsgraphs.Edge(18 , 19 , 1  )); 
// g.addEdge(new jsgraphs.Edge(19 , 16 , 4  )); 
// g.addEdge(new jsgraphs.Edge(16 , 20 , 4  )); 
// g.addEdge(new jsgraphs.Edge(20 , 21 , 1  )); 
// g.addEdge(new jsgraphs.Edge(21 , 17 , 5  )); 
// g.addEdge(new jsgraphs.Edge(17 , 22 , 5  )); 
// g.addEdge(new jsgraphs.Edge(100, 101, 4.5)); 
// g.addEdge(new jsgraphs.Edge(101, 126, 2  )); 
// g.addEdge(new jsgraphs.Edge(126, 127, 5  )); 
// g.addEdge(new jsgraphs.Edge(127, 128, 5  )); 
// g.addEdge(new jsgraphs.Edge(128, 102, 2  )); 
// g.addEdge(new jsgraphs.Edge(102, 125, 4.5)); 
// g.addEdge(new jsgraphs.Edge(101, 130, 2.8)); 
// g.addEdge(new jsgraphs.Edge(130, 103, 2.8)); 
// g.addEdge(new jsgraphs.Edge(103, 104, 4.2)); 
// g.addEdge(new jsgraphs.Edge(104, 105, 3.6)); 
// g.addEdge(new jsgraphs.Edge(105, 106, 2.8)); 
// g.addEdge(new jsgraphs.Edge(106, 107, 4.1)); 
// g.addEdge(new jsgraphs.Edge(107, 108, 4.1)); 
// g.addEdge(new jsgraphs.Edge(108, 109, 2.8)); 
// g.addEdge(new jsgraphs.Edge(109, 110, 3.6)); 
// g.addEdge(new jsgraphs.Edge(110, 111, 4.2)); 
// g.addEdge(new jsgraphs.Edge(111, 131, 2.8)); 
// g.addEdge(new jsgraphs.Edge(131, 102, 2.8)); 
// g.addEdge(new jsgraphs.Edge(107, 112, 4  )); 
// g.addEdge(new jsgraphs.Edge(112, 113, 1  )); 
// g.addEdge(new jsgraphs.Edge(113, 114, 5  )); 
// g.addEdge(new jsgraphs.Edge(114, 123, 5  )); 
// g.addEdge(new jsgraphs.Edge(123, 116, 4  )); 
// g.addEdge(new jsgraphs.Edge(113, 115, 5  )); 
// g.addEdge(new jsgraphs.Edge(115, 124, 5  )); 
// g.addEdge(new jsgraphs.Edge(124, 117, 4  )); 
// g.addEdge(new jsgraphs.Edge(118, 119, 1  )); 
// g.addEdge(new jsgraphs.Edge(119, 116, 4  )); 
// g.addEdge(new jsgraphs.Edge(116, 120, 4  )); 
// g.addEdge(new jsgraphs.Edge(120, 121, 1  )); 
// g.addEdge(new jsgraphs.Edge(121, 117, 5  )); 
// g.addEdge(new jsgraphs.Edge(117, 122, 5  )); 
// g.addEdge(new jsgraphs.Edge(200, 201, 4.5)); 
// g.addEdge(new jsgraphs.Edge(201, 226, 2  )); 
// g.addEdge(new jsgraphs.Edge(226, 227, 5  )); 
// g.addEdge(new jsgraphs.Edge(227, 228, 5  )); 
// g.addEdge(new jsgraphs.Edge(228, 202, 2  )); 
// g.addEdge(new jsgraphs.Edge(202, 225, 4.5)); 
// g.addEdge(new jsgraphs.Edge(201, 230, 2.8)); 
// g.addEdge(new jsgraphs.Edge(230, 203, 2.8)); 
// g.addEdge(new jsgraphs.Edge(203, 204, 4.2)); 
// g.addEdge(new jsgraphs.Edge(204, 205, 3.6)); 
// g.addEdge(new jsgraphs.Edge(205, 206, 2.8)); 
// g.addEdge(new jsgraphs.Edge(206, 207, 4.1)); 
// g.addEdge(new jsgraphs.Edge(207, 208, 4.1)); 
// g.addEdge(new jsgraphs.Edge(208, 209, 2.8)); 
// g.addEdge(new jsgraphs.Edge(209, 210, 3.6)); 
// g.addEdge(new jsgraphs.Edge(210, 211, 4.2)); 
// g.addEdge(new jsgraphs.Edge(211, 231, 2.8)); 
// g.addEdge(new jsgraphs.Edge(231, 202, 2.8)); 
// g.addEdge(new jsgraphs.Edge(207, 212, 4  )); 
// g.addEdge(new jsgraphs.Edge(212, 213, 1  )); 
// g.addEdge(new jsgraphs.Edge(213, 214, 5  )); 
// g.addEdge(new jsgraphs.Edge(214, 223, 5  )); 
// g.addEdge(new jsgraphs.Edge(223, 216, 4  )); 
// g.addEdge(new jsgraphs.Edge(213, 215, 5  )); 
// g.addEdge(new jsgraphs.Edge(215, 224, 5  )); 
// g.addEdge(new jsgraphs.Edge(224, 217, 4  )); 
// g.addEdge(new jsgraphs.Edge(218, 219, 1  )); 
// g.addEdge(new jsgraphs.Edge(219, 216, 4  )); 
// g.addEdge(new jsgraphs.Edge(216, 220, 4  )); 
// g.addEdge(new jsgraphs.Edge(220, 221, 1  )); 
// g.addEdge(new jsgraphs.Edge(221, 217, 5  )); 
// g.addEdge(new jsgraphs.Edge(217, 222, 5  )); 
// g.addEdge(new jsgraphs.Edge(300, 301, 4.5)); 
// g.addEdge(new jsgraphs.Edge(301, 326, 2  )); 
// g.addEdge(new jsgraphs.Edge(326, 327, 5  )); 
// g.addEdge(new jsgraphs.Edge(327, 328, 5  )); 
// g.addEdge(new jsgraphs.Edge(328, 302, 2  )); 
// g.addEdge(new jsgraphs.Edge(302, 325, 4.5)); 
// g.addEdge(new jsgraphs.Edge(301, 330, 2.8)); 
// g.addEdge(new jsgraphs.Edge(330, 303, 2.8)); 
// g.addEdge(new jsgraphs.Edge(303, 304, 4.2)); 
// g.addEdge(new jsgraphs.Edge(304, 305, 3.6)); 
// g.addEdge(new jsgraphs.Edge(305, 306, 2.8)); 
// g.addEdge(new jsgraphs.Edge(306, 307, 4.1)); 
// g.addEdge(new jsgraphs.Edge(307, 308, 4.1)); 
// g.addEdge(new jsgraphs.Edge(308, 309, 2.8)); 
// g.addEdge(new jsgraphs.Edge(309, 310, 3.6)); 
// g.addEdge(new jsgraphs.Edge(310, 311, 4.2)); 
// g.addEdge(new jsgraphs.Edge(311, 331, 2.8)); 
// g.addEdge(new jsgraphs.Edge(331, 302, 2.8)); 
// g.addEdge(new jsgraphs.Edge(307, 312, 4  )); 
// g.addEdge(new jsgraphs.Edge(312, 313, 1  )); 
// g.addEdge(new jsgraphs.Edge(313, 314, 5  )); 
// g.addEdge(new jsgraphs.Edge(314, 323, 5  )); 
// g.addEdge(new jsgraphs.Edge(323, 316, 4  )); 
// g.addEdge(new jsgraphs.Edge(313, 315, 5  )); 
// g.addEdge(new jsgraphs.Edge(315, 324, 5  )); 
// g.addEdge(new jsgraphs.Edge(324, 317, 4  )); 
// g.addEdge(new jsgraphs.Edge(318, 319, 1  )); 
// g.addEdge(new jsgraphs.Edge(319, 316, 4  )); 
// g.addEdge(new jsgraphs.Edge(316, 320, 4  )); 
// g.addEdge(new jsgraphs.Edge(320, 321, 1  )); 
// g.addEdge(new jsgraphs.Edge(321, 317, 5  )); 
// g.addEdge(new jsgraphs.Edge(317, 322, 5  )); 
// g.addEdge(new jsgraphs.Edge(400, 401, 4.5)); 
// g.addEdge(new jsgraphs.Edge(401, 426, 2  )); 
// g.addEdge(new jsgraphs.Edge(426, 427, 5  )); 
// g.addEdge(new jsgraphs.Edge(427, 428, 5  )); 
// g.addEdge(new jsgraphs.Edge(428, 402, 2  )); 
// g.addEdge(new jsgraphs.Edge(402, 425, 4.5)); 
// g.addEdge(new jsgraphs.Edge(401, 430, 2.8)); 
// g.addEdge(new jsgraphs.Edge(430, 403, 2.8)); 
// g.addEdge(new jsgraphs.Edge(403, 404, 4.2)); 
// g.addEdge(new jsgraphs.Edge(404, 405, 3.6)); 
// g.addEdge(new jsgraphs.Edge(405, 406, 2.8)); 
// g.addEdge(new jsgraphs.Edge(406, 407, 4.1)); 
// g.addEdge(new jsgraphs.Edge(407, 408, 4.1)); 
// g.addEdge(new jsgraphs.Edge(408, 409, 2.8)); 
// g.addEdge(new jsgraphs.Edge(409, 410, 3.6)); 
// g.addEdge(new jsgraphs.Edge(410, 411, 4.2)); 
// g.addEdge(new jsgraphs.Edge(411, 431, 2.8)); 
// g.addEdge(new jsgraphs.Edge(431, 402, 2.8)); 
// g.addEdge(new jsgraphs.Edge(407, 412, 4  )); 
// g.addEdge(new jsgraphs.Edge(412, 413, 1  )); 
// g.addEdge(new jsgraphs.Edge(413, 414, 5  )); 
// g.addEdge(new jsgraphs.Edge(414, 423, 5  )); 
// g.addEdge(new jsgraphs.Edge(423, 416, 4  )); 
// g.addEdge(new jsgraphs.Edge(413, 415, 5  )); 
// g.addEdge(new jsgraphs.Edge(415, 424, 5  )); 
// g.addEdge(new jsgraphs.Edge(424, 417, 4  )); 
// g.addEdge(new jsgraphs.Edge(418, 419, 1  )); 
// g.addEdge(new jsgraphs.Edge(419, 416, 4  )); 
// g.addEdge(new jsgraphs.Edge(416, 420, 4  )); 
// g.addEdge(new jsgraphs.Edge(420, 421, 1  )); 
// g.addEdge(new jsgraphs.Edge(421, 417, 5  )); 
// g.addEdge(new jsgraphs.Edge(417, 422, 5  )); 
// g.addEdge(new jsgraphs.Edge(500, 501, 4.5)); 
// g.addEdge(new jsgraphs.Edge(501, 526, 2  )); 
// g.addEdge(new jsgraphs.Edge(526, 527, 5  )); 
// g.addEdge(new jsgraphs.Edge(527, 528, 5  )); 
// g.addEdge(new jsgraphs.Edge(528, 502, 2  )); 
// g.addEdge(new jsgraphs.Edge(502, 525, 4.5)); 
// g.addEdge(new jsgraphs.Edge(501, 530, 2.8)); 
// g.addEdge(new jsgraphs.Edge(530, 503, 2.8)); 
// g.addEdge(new jsgraphs.Edge(503, 504, 4.2)); 
// g.addEdge(new jsgraphs.Edge(504, 505, 3.6)); 
// g.addEdge(new jsgraphs.Edge(505, 506, 2.8)); 
// g.addEdge(new jsgraphs.Edge(506, 507, 4.1)); 
// g.addEdge(new jsgraphs.Edge(507, 508, 4.1)); 
// g.addEdge(new jsgraphs.Edge(508, 509, 2.8)); 
// g.addEdge(new jsgraphs.Edge(509, 510, 3.6)); 
// g.addEdge(new jsgraphs.Edge(510, 511, 4.2)); 
// g.addEdge(new jsgraphs.Edge(511, 531, 2.8)); 
// g.addEdge(new jsgraphs.Edge(531, 502, 2.8)); 
// g.addEdge(new jsgraphs.Edge(507, 512, 4  )); 
// g.addEdge(new jsgraphs.Edge(512, 513, 1  )); 
// g.addEdge(new jsgraphs.Edge(513, 514, 5  )); 
// g.addEdge(new jsgraphs.Edge(514, 523, 5  )); 
// g.addEdge(new jsgraphs.Edge(523, 516, 4  )); 
// g.addEdge(new jsgraphs.Edge(513, 515, 5  )); 
// g.addEdge(new jsgraphs.Edge(515, 524, 5  )); 
// g.addEdge(new jsgraphs.Edge(524, 517, 4  )); 
// g.addEdge(new jsgraphs.Edge(518, 519, 1  )); 
// g.addEdge(new jsgraphs.Edge(519, 516, 4  )); 
// g.addEdge(new jsgraphs.Edge(516, 520, 4  )); 
// g.addEdge(new jsgraphs.Edge(520, 521, 1  )); 
// g.addEdge(new jsgraphs.Edge(521, 517, 5  )); 
// g.addEdge(new jsgraphs.Edge(517, 522, 5  )); 
// //connecting sjsgraphs.tairs in graph
// g.addEdge(new jsgraphs.Edge(1  , 101, 5  )); 
// g.addEdge(new jsgraphs.Edge(2  , 102, 5  )); 
// g.addEdge(new jsgraphs.Edge(4  , 104, 5  )); 
// g.addEdge(new jsgraphs.Edge(10 , 110, 5  )); 
// g.addEdge(new jsgraphs.Edge(13 , 113, 5  )); 
// g.addEdge(new jsgraphs.Edge(18 , 118, 5  )); 
// g.addEdge(new jsgraphs.Edge(22 , 122, 5  )); 
// g.addEdge(new jsgraphs.Edge(101, 201, 5  )); 
// g.addEdge(new jsgraphs.Edge(102, 202, 5  )); 
// g.addEdge(new jsgraphs.Edge(104, 204, 5  )); 
// g.addEdge(new jsgraphs.Edge(110, 210, 5  )); 
// g.addEdge(new jsgraphs.Edge(113, 213, 5  )); 
// g.addEdge(new jsgraphs.Edge(118, 218, 5  )); 
// g.addEdge(new jsgraphs.Edge(122, 222, 5  )); 
// g.addEdge(new jsgraphs.Edge(201, 301, 5  )); 
// g.addEdge(new jsgraphs.Edge(202, 302, 5  )); 
// g.addEdge(new jsgraphs.Edge(204, 304, 5  )); 
// g.addEdge(new jsgraphs.Edge(210, 310, 5  )); 
// g.addEdge(new jsgraphs.Edge(213, 313, 5  )); 
// g.addEdge(new jsgraphs.Edge(218, 318, 5  )); 
// g.addEdge(new jsgraphs.Edge(222, 322, 5  )); 
// g.addEdge(new jsgraphs.Edge(301, 401, 5  )); 
// g.addEdge(new jsgraphs.Edge(302, 402, 5  )); 
// g.addEdge(new jsgraphs.Edge(304, 404, 5  )); 
// g.addEdge(new jsgraphs.Edge(310, 410, 5  )); 
// g.addEdge(new jsgraphs.Edge(313, 413, 5  )); 
// g.addEdge(new jsgraphs.Edge(318, 418, 5  )); 
// g.addEdge(new jsgraphs.Edge(322, 422, 5  )); 
// g.addEdge(new jsgraphs.Edge(401, 501, 5  )); 
// g.addEdge(new jsgraphs.Edge(402, 502, 5  )); 
// g.addEdge(new jsgraphs.Edge(404, 504, 5  )); 
// g.addEdge(new jsgraphs.Edge(410, 510, 5  )); 
// g.addEdge(new jsgraphs.Edge(413, 513, 5  )); 
// g.addEdge(new jsgraphs.Edge(418, 518, 5  )); 
// g.addEdge(new jsgraphs.Edge(422, 522, 5  )); 

export {g};

// g.node(0 ).label='rr l';    