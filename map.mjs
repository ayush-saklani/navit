import pkg from 'js-graph-algorithms';
const { Graph,WeightedDiGraph, Edge, Dijkstra } = pkg;

var g = new WeightedDiGraph(550);

// it is an undirected graph so i have to add the edges two times with same weight
g.addEdge(new Edge(0  , 1  , 4.5));   g.addEdge(new Edge(1  , 0  , 4.5));
g.addEdge(new Edge(1  , 26 , 2  ));   g.addEdge(new Edge(26 , 1  , 2  ));
g.addEdge(new Edge(26 , 27 , 5  ));   g.addEdge(new Edge(27 , 26 , 5  ));
g.addEdge(new Edge(27 , 29 , 4  ));   g.addEdge(new Edge(29 , 27 , 4  ));
g.addEdge(new Edge(27 , 28 , 5  ));   g.addEdge(new Edge(28 , 27 , 5  ));
g.addEdge(new Edge(28 , 2  , 2  ));   g.addEdge(new Edge(2  , 28 , 2  ));
g.addEdge(new Edge(2  , 25 , 4.5));   g.addEdge(new Edge(25 , 2  , 4.5));
g.addEdge(new Edge(1  , 30 , 2.8));   g.addEdge(new Edge(30 , 1  , 2.8));
g.addEdge(new Edge(30 , 3  , 2.8));   g.addEdge(new Edge(3  , 30 , 2.8));
g.addEdge(new Edge(3  , 4  , 4.2));   g.addEdge(new Edge(4  , 3  , 4.2));
g.addEdge(new Edge(4  , 5  , 3.6));   g.addEdge(new Edge(5  , 4  , 3.6));
g.addEdge(new Edge(5  , 6  , 2.8));   g.addEdge(new Edge(6  , 5  , 2.8));
g.addEdge(new Edge(6  , 7  , 4.1));   g.addEdge(new Edge(7  , 6  , 4.1));
g.addEdge(new Edge(7  , 8  , 4.1));   g.addEdge(new Edge(8  , 7  , 4.1));
g.addEdge(new Edge(8  , 9  , 2.8));   g.addEdge(new Edge(9  , 8  , 2.8));
g.addEdge(new Edge(9  , 10 , 3.6));   g.addEdge(new Edge(10 , 9  , 3.6));
g.addEdge(new Edge(10 , 11 , 4.2));   g.addEdge(new Edge(11 , 10 , 4.2));
g.addEdge(new Edge(11 , 31 , 2.8));   g.addEdge(new Edge(31 , 11 , 2.8));
g.addEdge(new Edge(31 , 2  , 2.8));   g.addEdge(new Edge(2  , 31 , 2.8));
g.addEdge(new Edge(7  , 12 , 4  ));   g.addEdge(new Edge(12 , 7  , 4  ));
g.addEdge(new Edge(12 , 13 , 1  ));   g.addEdge(new Edge(13 , 12 , 1  ));
g.addEdge(new Edge(13 , 14 , 5  ));   g.addEdge(new Edge(14 , 13 , 5  ));
g.addEdge(new Edge(14 , 23 , 5  ));   g.addEdge(new Edge(23 , 14 , 5  ));
g.addEdge(new Edge(23 , 16 , 4  ));   g.addEdge(new Edge(16 , 23 , 4  ));
g.addEdge(new Edge(13 , 15 , 5  ));   g.addEdge(new Edge(15 , 13 , 5  ));
g.addEdge(new Edge(15 , 24 , 5  ));   g.addEdge(new Edge(24 , 15 , 5  ));
g.addEdge(new Edge(24 , 17 , 4  ));   g.addEdge(new Edge(17 , 24 , 4  ));
g.addEdge(new Edge(18 , 19 , 1  ));   g.addEdge(new Edge(19 , 18 , 1  ));
g.addEdge(new Edge(19 , 16 , 4  ));   g.addEdge(new Edge(16 , 19 , 4  ));
g.addEdge(new Edge(16 , 20 , 4  ));   g.addEdge(new Edge(20 , 16 , 4  ));
g.addEdge(new Edge(20 , 21 , 1  ));   g.addEdge(new Edge(21 , 20 , 1  ));
g.addEdge(new Edge(21 , 17 , 5  ));   g.addEdge(new Edge(17 , 21 , 5  ));
g.addEdge(new Edge(17 , 22 , 5  ));   g.addEdge(new Edge(22 , 17 , 5  ));
g.addEdge(new Edge(100, 101, 4.5));   g.addEdge(new Edge(101, 100, 4.5));
g.addEdge(new Edge(101, 126, 2  ));   g.addEdge(new Edge(126, 101, 2  ));
g.addEdge(new Edge(126, 127, 5  ));   g.addEdge(new Edge(127, 126, 5  ));
g.addEdge(new Edge(127, 128, 5  ));   g.addEdge(new Edge(128, 127, 5  ));
g.addEdge(new Edge(128, 102, 2  ));   g.addEdge(new Edge(102, 128, 2  ));
g.addEdge(new Edge(102, 125, 4.5));   g.addEdge(new Edge(125, 102, 4.5));
g.addEdge(new Edge(101, 130, 2.8));   g.addEdge(new Edge(130, 101, 2.8));
g.addEdge(new Edge(130, 103, 2.8));   g.addEdge(new Edge(103, 130, 2.8));
g.addEdge(new Edge(103, 104, 4.2));   g.addEdge(new Edge(104, 103, 4.2));
g.addEdge(new Edge(104, 105, 3.6));   g.addEdge(new Edge(105, 104, 3.6));
g.addEdge(new Edge(105, 106, 2.8));   g.addEdge(new Edge(106, 105, 2.8));
g.addEdge(new Edge(106, 107, 4.1));   g.addEdge(new Edge(107, 106, 4.1));
g.addEdge(new Edge(107, 108, 4.1));   g.addEdge(new Edge(108, 107, 4.1));
g.addEdge(new Edge(108, 109, 2.8));   g.addEdge(new Edge(109, 108, 2.8));
g.addEdge(new Edge(109, 110, 3.6));   g.addEdge(new Edge(110, 109, 3.6));
g.addEdge(new Edge(110, 111, 4.2));   g.addEdge(new Edge(111, 110, 4.2));
g.addEdge(new Edge(111, 131, 2.8));   g.addEdge(new Edge(131, 111, 2.8));
g.addEdge(new Edge(131, 102, 2.8));   g.addEdge(new Edge(102, 131, 2.8));
g.addEdge(new Edge(107, 112, 4  ));   g.addEdge(new Edge(112, 107, 4  ));
g.addEdge(new Edge(112, 113, 1  ));   g.addEdge(new Edge(113, 112, 1  ));
g.addEdge(new Edge(113, 114, 5  ));   g.addEdge(new Edge(114, 113, 5  ));
g.addEdge(new Edge(114, 123, 5  ));   g.addEdge(new Edge(123, 114, 5  ));
g.addEdge(new Edge(123, 116, 4  ));   g.addEdge(new Edge(116, 123, 4  ));
g.addEdge(new Edge(113, 115, 5  ));   g.addEdge(new Edge(115, 113, 5  ));
g.addEdge(new Edge(115, 124, 5  ));   g.addEdge(new Edge(124, 115, 5  ));
g.addEdge(new Edge(124, 117, 4  ));   g.addEdge(new Edge(117, 124, 4  ));
g.addEdge(new Edge(118, 119, 1  ));   g.addEdge(new Edge(119, 118, 1  ));
g.addEdge(new Edge(119, 116, 4  ));   g.addEdge(new Edge(116, 119, 4  ));
g.addEdge(new Edge(116, 120, 4  ));   g.addEdge(new Edge(120, 116, 4  ));
g.addEdge(new Edge(120, 121, 1  ));   g.addEdge(new Edge(121, 120, 1  ));
g.addEdge(new Edge(121, 117, 5  ));   g.addEdge(new Edge(117, 121, 5  ));
g.addEdge(new Edge(117, 122, 5  ));   g.addEdge(new Edge(122, 117, 5  ));
g.addEdge(new Edge(200, 201, 4.5));   g.addEdge(new Edge(201, 200, 4.5));
g.addEdge(new Edge(201, 226, 2  ));   g.addEdge(new Edge(226, 201, 2  ));
g.addEdge(new Edge(226, 227, 5  ));   g.addEdge(new Edge(227, 226, 5  ));
g.addEdge(new Edge(227, 228, 5  ));   g.addEdge(new Edge(228, 227, 5  ));
g.addEdge(new Edge(228, 202, 2  ));   g.addEdge(new Edge(202, 228, 2  ));
g.addEdge(new Edge(202, 225, 4.5));   g.addEdge(new Edge(225, 202, 4.5));
g.addEdge(new Edge(201, 230, 2.8));   g.addEdge(new Edge(230, 201, 2.8));
g.addEdge(new Edge(230, 203, 2.8));   g.addEdge(new Edge(203, 230, 2.8));
g.addEdge(new Edge(203, 204, 4.2));   g.addEdge(new Edge(204, 203, 4.2));
g.addEdge(new Edge(204, 205, 3.6));   g.addEdge(new Edge(205, 204, 3.6));
g.addEdge(new Edge(205, 206, 2.8));   g.addEdge(new Edge(206, 205, 2.8));
g.addEdge(new Edge(206, 207, 4.1));   g.addEdge(new Edge(207, 206, 4.1));
g.addEdge(new Edge(207, 208, 4.1));   g.addEdge(new Edge(208, 207, 4.1));
g.addEdge(new Edge(208, 209, 2.8));   g.addEdge(new Edge(209, 208, 2.8));
g.addEdge(new Edge(209, 210, 3.6));   g.addEdge(new Edge(210, 209, 3.6));
g.addEdge(new Edge(210, 211, 4.2));   g.addEdge(new Edge(211, 210, 4.2));
g.addEdge(new Edge(211, 231, 2.8));   g.addEdge(new Edge(231, 211, 2.8));
g.addEdge(new Edge(231, 202, 2.8));   g.addEdge(new Edge(202, 231, 2.8));
g.addEdge(new Edge(207, 212, 4  ));   g.addEdge(new Edge(212, 207, 4  ));
g.addEdge(new Edge(212, 213, 1  ));   g.addEdge(new Edge(213, 212, 1  ));
g.addEdge(new Edge(213, 214, 5  ));   g.addEdge(new Edge(214, 213, 5  ));
g.addEdge(new Edge(214, 223, 5  ));   g.addEdge(new Edge(223, 214, 5  ));
g.addEdge(new Edge(223, 216, 4  ));   g.addEdge(new Edge(216, 223, 4  ));
g.addEdge(new Edge(213, 215, 5  ));   g.addEdge(new Edge(215, 213, 5  ));
g.addEdge(new Edge(215, 224, 5  ));   g.addEdge(new Edge(224, 215, 5  ));
g.addEdge(new Edge(224, 217, 4  ));   g.addEdge(new Edge(217, 224, 4  ));
g.addEdge(new Edge(218, 219, 1  ));   g.addEdge(new Edge(219, 218, 1  ));
g.addEdge(new Edge(219, 216, 4  ));   g.addEdge(new Edge(216, 219, 4  ));
g.addEdge(new Edge(216, 220, 4  ));   g.addEdge(new Edge(220, 216, 4  ));
g.addEdge(new Edge(220, 221, 1  ));   g.addEdge(new Edge(221, 220, 1  ));
g.addEdge(new Edge(221, 217, 5  ));   g.addEdge(new Edge(217, 221, 5  ));
g.addEdge(new Edge(217, 222, 5  ));   g.addEdge(new Edge(222, 217, 5  ));
g.addEdge(new Edge(300, 301, 4.5));   g.addEdge(new Edge(301, 300, 4.5));
g.addEdge(new Edge(301, 326, 2  ));   g.addEdge(new Edge(326, 301, 2  ));
g.addEdge(new Edge(326, 327, 5  ));   g.addEdge(new Edge(327, 326, 5  ));
g.addEdge(new Edge(327, 328, 5  ));   g.addEdge(new Edge(328, 327, 5  ));
g.addEdge(new Edge(328, 302, 2  ));   g.addEdge(new Edge(302, 328, 2  ));
g.addEdge(new Edge(302, 325, 4.5));   g.addEdge(new Edge(325, 302, 4.5));
g.addEdge(new Edge(301, 330, 2.8));   g.addEdge(new Edge(330, 301, 2.8));
g.addEdge(new Edge(330, 303, 2.8));   g.addEdge(new Edge(303, 330, 2.8));
g.addEdge(new Edge(303, 304, 4.2));   g.addEdge(new Edge(304, 303, 4.2));
g.addEdge(new Edge(304, 305, 3.6));   g.addEdge(new Edge(305, 304, 3.6));
g.addEdge(new Edge(305, 306, 2.8));   g.addEdge(new Edge(306, 305, 2.8));
g.addEdge(new Edge(306, 307, 4.1));   g.addEdge(new Edge(307, 306, 4.1));
g.addEdge(new Edge(307, 308, 4.1));   g.addEdge(new Edge(308, 307, 4.1));
g.addEdge(new Edge(308, 309, 2.8));   g.addEdge(new Edge(309, 308, 2.8));
g.addEdge(new Edge(309, 310, 3.6));   g.addEdge(new Edge(310, 309, 3.6));
g.addEdge(new Edge(310, 311, 4.2));   g.addEdge(new Edge(311, 310, 4.2));
g.addEdge(new Edge(311, 331, 2.8));   g.addEdge(new Edge(331, 311, 2.8));
g.addEdge(new Edge(331, 302, 2.8));   g.addEdge(new Edge(302, 331, 2.8));
g.addEdge(new Edge(307, 312, 4  ));   g.addEdge(new Edge(312, 307, 4  ));
g.addEdge(new Edge(312, 313, 1  ));   g.addEdge(new Edge(313, 312, 1  ));
g.addEdge(new Edge(313, 314, 5  ));   g.addEdge(new Edge(314, 313, 5  ));
g.addEdge(new Edge(314, 323, 5  ));   g.addEdge(new Edge(323, 314, 5  ));
g.addEdge(new Edge(323, 316, 4  ));   g.addEdge(new Edge(316, 323, 4  ));
g.addEdge(new Edge(313, 315, 5  ));   g.addEdge(new Edge(315, 313, 5  ));
g.addEdge(new Edge(315, 324, 5  ));   g.addEdge(new Edge(324, 315, 5  ));
g.addEdge(new Edge(324, 317, 4  ));   g.addEdge(new Edge(317, 324, 4  ));
g.addEdge(new Edge(318, 319, 1  ));   g.addEdge(new Edge(319, 318, 1  ));
g.addEdge(new Edge(319, 316, 4  ));   g.addEdge(new Edge(316, 319, 4  ));
g.addEdge(new Edge(316, 320, 4  ));   g.addEdge(new Edge(320, 316, 4  ));
g.addEdge(new Edge(320, 321, 1  ));   g.addEdge(new Edge(321, 320, 1  ));
g.addEdge(new Edge(321, 317, 5  ));   g.addEdge(new Edge(317, 321, 5  ));
g.addEdge(new Edge(317, 322, 5  ));   g.addEdge(new Edge(322, 317, 5  ));
g.addEdge(new Edge(400, 401, 4.5));   g.addEdge(new Edge(401, 400, 4.5));
g.addEdge(new Edge(401, 426, 2  ));   g.addEdge(new Edge(426, 401, 2  ));
g.addEdge(new Edge(426, 427, 5  ));   g.addEdge(new Edge(427, 426, 5  ));
g.addEdge(new Edge(427, 428, 5  ));   g.addEdge(new Edge(428, 427, 5  ));
g.addEdge(new Edge(428, 402, 2  ));   g.addEdge(new Edge(402, 428, 2  ));
g.addEdge(new Edge(402, 425, 4.5));   g.addEdge(new Edge(425, 402, 4.5));
g.addEdge(new Edge(401, 430, 2.8));   g.addEdge(new Edge(430, 401, 2.8));
g.addEdge(new Edge(430, 403, 2.8));   g.addEdge(new Edge(403, 430, 2.8));
g.addEdge(new Edge(403, 404, 4.2));   g.addEdge(new Edge(404, 403, 4.2));
g.addEdge(new Edge(404, 405, 3.6));   g.addEdge(new Edge(405, 404, 3.6));
g.addEdge(new Edge(405, 406, 2.8));   g.addEdge(new Edge(406, 405, 2.8));
g.addEdge(new Edge(406, 407, 4.1));   g.addEdge(new Edge(407, 406, 4.1));
g.addEdge(new Edge(407, 408, 4.1));   g.addEdge(new Edge(408, 407, 4.1));
g.addEdge(new Edge(408, 409, 2.8));   g.addEdge(new Edge(409, 408, 2.8));
g.addEdge(new Edge(409, 410, 3.6));   g.addEdge(new Edge(410, 409, 3.6));
g.addEdge(new Edge(410, 411, 4.2));   g.addEdge(new Edge(411, 410, 4.2));
g.addEdge(new Edge(411, 431, 2.8));   g.addEdge(new Edge(431, 411, 2.8));
g.addEdge(new Edge(431, 402, 2.8));   g.addEdge(new Edge(402, 431, 2.8));
g.addEdge(new Edge(407, 412, 4  ));   g.addEdge(new Edge(412, 407, 4  ));
g.addEdge(new Edge(412, 413, 1  ));   g.addEdge(new Edge(413, 412, 1  ));
g.addEdge(new Edge(413, 414, 5  ));   g.addEdge(new Edge(414, 413, 5  ));
g.addEdge(new Edge(414, 423, 5  ));   g.addEdge(new Edge(423, 414, 5  ));
g.addEdge(new Edge(423, 416, 4  ));   g.addEdge(new Edge(416, 423, 4  ));
g.addEdge(new Edge(413, 415, 5  ));   g.addEdge(new Edge(415, 413, 5  ));
g.addEdge(new Edge(415, 424, 5  ));   g.addEdge(new Edge(424, 415, 5  ));
g.addEdge(new Edge(424, 417, 4  ));   g.addEdge(new Edge(417, 424, 4  ));
g.addEdge(new Edge(418, 419, 1  ));   g.addEdge(new Edge(419, 418, 1  ));
g.addEdge(new Edge(419, 416, 4  ));   g.addEdge(new Edge(416, 419, 4  ));
g.addEdge(new Edge(416, 420, 4  ));   g.addEdge(new Edge(420, 416, 4  ));
g.addEdge(new Edge(420, 421, 1  ));   g.addEdge(new Edge(421, 420, 1  ));
g.addEdge(new Edge(421, 417, 5  ));   g.addEdge(new Edge(417, 421, 5  ));
g.addEdge(new Edge(417, 422, 5  ));   g.addEdge(new Edge(422, 417, 5  ));
g.addEdge(new Edge(500, 501, 4.5));   g.addEdge(new Edge(501, 500, 4.5));
g.addEdge(new Edge(501, 526, 2  ));   g.addEdge(new Edge(526, 501, 2  ));
g.addEdge(new Edge(526, 527, 5  ));   g.addEdge(new Edge(527, 526, 5  ));
g.addEdge(new Edge(527, 528, 5  ));   g.addEdge(new Edge(528, 527, 5  ));
g.addEdge(new Edge(528, 502, 2  ));   g.addEdge(new Edge(502, 528, 2  ));
g.addEdge(new Edge(502, 525, 4.5));   g.addEdge(new Edge(525, 502, 4.5));
g.addEdge(new Edge(501, 530, 2.8));   g.addEdge(new Edge(530, 501, 2.8));
g.addEdge(new Edge(530, 503, 2.8));   g.addEdge(new Edge(503, 530, 2.8));
g.addEdge(new Edge(503, 504, 4.2));   g.addEdge(new Edge(504, 503, 4.2));
g.addEdge(new Edge(504, 505, 3.6));   g.addEdge(new Edge(505, 504, 3.6));
g.addEdge(new Edge(505, 506, 2.8));   g.addEdge(new Edge(506, 505, 2.8));
g.addEdge(new Edge(506, 507, 4.1));   g.addEdge(new Edge(507, 506, 4.1));
g.addEdge(new Edge(507, 508, 4.1));   g.addEdge(new Edge(508, 507, 4.1));
g.addEdge(new Edge(508, 509, 2.8));   g.addEdge(new Edge(509, 508, 2.8));
g.addEdge(new Edge(509, 510, 3.6));   g.addEdge(new Edge(510, 509, 3.6));
g.addEdge(new Edge(510, 511, 4.2));   g.addEdge(new Edge(511, 510, 4.2));
g.addEdge(new Edge(511, 531, 2.8));   g.addEdge(new Edge(531, 511, 2.8));
g.addEdge(new Edge(531, 502, 2.8));   g.addEdge(new Edge(502, 531, 2.8));
g.addEdge(new Edge(507, 512, 4  ));   g.addEdge(new Edge(512, 507, 4  ));
g.addEdge(new Edge(512, 513, 1  ));   g.addEdge(new Edge(513, 512, 1  ));
g.addEdge(new Edge(513, 514, 5  ));   g.addEdge(new Edge(514, 513, 5  ));
g.addEdge(new Edge(514, 523, 5  ));   g.addEdge(new Edge(523, 514, 5  ));
g.addEdge(new Edge(523, 516, 4  ));   g.addEdge(new Edge(516, 523, 4  ));
g.addEdge(new Edge(513, 515, 5  ));   g.addEdge(new Edge(515, 513, 5  ));
g.addEdge(new Edge(515, 524, 5  ));   g.addEdge(new Edge(524, 515, 5  ));
g.addEdge(new Edge(524, 517, 4  ));   g.addEdge(new Edge(517, 524, 4  ));
g.addEdge(new Edge(518, 519, 1  ));   g.addEdge(new Edge(519, 518, 1  ));
g.addEdge(new Edge(519, 516, 4  ));   g.addEdge(new Edge(516, 519, 4  ));
g.addEdge(new Edge(516, 520, 4  ));   g.addEdge(new Edge(520, 516, 4  ));
g.addEdge(new Edge(520, 521, 1  ));   g.addEdge(new Edge(521, 520, 1  ));
g.addEdge(new Edge(521, 517, 5  ));   g.addEdge(new Edge(517, 521, 5  ));
g.addEdge(new Edge(517, 522, 5  ));   g.addEdge(new Edge(522, 517, 5  ));
//connecting stairs in graph
g.addEdge(new Edge(1  , 101, 5  ));   g.addEdge(new Edge(101, 1  , 5  ));
g.addEdge(new Edge(2  , 102, 5  ));   g.addEdge(new Edge(102, 2  , 5  ));
g.addEdge(new Edge(4  , 104, 5  ));   g.addEdge(new Edge(104, 4  , 5  ));
g.addEdge(new Edge(10 , 110, 5  ));   g.addEdge(new Edge(110, 10 , 5  ));
g.addEdge(new Edge(13 , 113, 5  ));   g.addEdge(new Edge(113, 13 , 5  ));
g.addEdge(new Edge(18 , 118, 5  ));   g.addEdge(new Edge(118, 18 , 5  ));
g.addEdge(new Edge(22 , 122, 5  ));   g.addEdge(new Edge(122, 22 , 5  ));
g.addEdge(new Edge(101, 201, 5  ));   g.addEdge(new Edge(201, 101, 5  ));
g.addEdge(new Edge(102, 202, 5  ));   g.addEdge(new Edge(202, 102, 5  ));
g.addEdge(new Edge(104, 204, 5  ));   g.addEdge(new Edge(204, 104, 5  ));
g.addEdge(new Edge(110, 210, 5  ));   g.addEdge(new Edge(210, 110, 5  ));
g.addEdge(new Edge(113, 213, 5  ));   g.addEdge(new Edge(213, 113, 5  ));
g.addEdge(new Edge(118, 218, 5  ));   g.addEdge(new Edge(218, 118, 5  ));
g.addEdge(new Edge(122, 222, 5  ));   g.addEdge(new Edge(222, 122, 5  ));
g.addEdge(new Edge(201, 301, 5  ));   g.addEdge(new Edge(301, 201, 5  ));
g.addEdge(new Edge(202, 302, 5  ));   g.addEdge(new Edge(302, 202, 5  ));
g.addEdge(new Edge(204, 304, 5  ));   g.addEdge(new Edge(304, 204, 5  ));
g.addEdge(new Edge(210, 310, 5  ));   g.addEdge(new Edge(310, 210, 5  ));
g.addEdge(new Edge(213, 313, 5  ));   g.addEdge(new Edge(313, 213, 5  ));
g.addEdge(new Edge(218, 318, 5  ));   g.addEdge(new Edge(318, 218, 5  ));
g.addEdge(new Edge(222, 322, 5  ));   g.addEdge(new Edge(322, 222, 5  ));
g.addEdge(new Edge(301, 401, 5  ));   g.addEdge(new Edge(401, 301, 5  ));
g.addEdge(new Edge(302, 402, 5  ));   g.addEdge(new Edge(402, 302, 5  ));
g.addEdge(new Edge(304, 404, 5  ));   g.addEdge(new Edge(404, 304, 5  ));
g.addEdge(new Edge(310, 410, 5  ));   g.addEdge(new Edge(410, 310, 5  ));
g.addEdge(new Edge(313, 413, 5  ));   g.addEdge(new Edge(413, 313, 5  ));
g.addEdge(new Edge(318, 418, 5  ));   g.addEdge(new Edge(418, 318, 5  ));
g.addEdge(new Edge(322, 422, 5  ));   g.addEdge(new Edge(422, 322, 5  ));
g.addEdge(new Edge(401, 501, 5  ));   g.addEdge(new Edge(501, 401, 5  ));
g.addEdge(new Edge(402, 502, 5  ));   g.addEdge(new Edge(502, 402, 5  ));
g.addEdge(new Edge(404, 504, 5  ));   g.addEdge(new Edge(504, 404, 5  ));
g.addEdge(new Edge(410, 510, 5  ));   g.addEdge(new Edge(510, 410, 5  ));
g.addEdge(new Edge(413, 513, 5  ));   g.addEdge(new Edge(513, 413, 5  ));
g.addEdge(new Edge(418, 518, 5  ));   g.addEdge(new Edge(518, 418, 5  ));
g.addEdge(new Edge(422, 522, 5  ));   g.addEdge(new Edge(522, 422, 5  ));

export {g};

// g.node(0 ).label='rr l';          
// g.node(1 ).label='';      
// g.node(2 ).label='stair front r';      
// g.node(3 ).label='lt x02';        
// g.node(4 ).label='stair mid l';    
// g.node(5 ).label='staff corridor';     
// g.node(6 ).label='stair mid r';    
// g.node(7 ).label='lt x01';        
// g.node(8 ).label='com lab l';      
// g.node(9 ).label='stair mid c';    
// g.node(10).label='com lab r';      
// g.node(11).label='stair back l';       
// g.node(12).label='turn l';        
// g.node(13).label='turn r';        
// g.node(14).label='stair back r';       
// g.node(15).label='rr r';                
// g.node(16).label='stair mid r';    
// g.node(17).label='lt x01';       
// g.node(18).label='com lab l';      
// g.node(19).label='stair mid c';    
// g.node(20).label='com lab r';      
// g.node(21).label='stair back l';       
// g.node(22).label='turn l';        
// g.node(23).label='turn r';        
// g.node(24).label='stair back r';       
// g.node(25).label='rr r';          
// g.node(26).label='stair mid r';    
// g.node(27).label='lt x01';       
// g.node(28).label='com lab l';      
// g.node(29).label='stair mid c';
// g.node(30).label='stair mid c';
// g.node(31).label='stair mid c';