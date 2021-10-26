-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-10-2021 a las 07:26:57
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `databetsolver`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `competencias`
--

CREATE TABLE `competencias` (
  `idCompeticiones` int(11) NOT NULL,
  `idLigaLocal` int(11) NOT NULL,
  `idLigaVisitante` int(11) NOT NULL,
  `idEquipoLocal` int(11) NOT NULL,
  `idEquipoVisitante` int(11) NOT NULL,
  `golesLocal` int(2) NOT NULL DEFAULT 0,
  `golesVisitante` int(2) NOT NULL DEFAULT 0,
  `fechaCompeticion` datetime NOT NULL DEFAULT current_timestamp(),
  `horaCompeticion` time NOT NULL DEFAULT current_timestamp(),
  `habilitado` tinyint(4) NOT NULL DEFAULT 1,
  `habiliParley` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `competencias`
--

INSERT INTO `competencias` (`idCompeticiones`, `idLigaLocal`, `idLigaVisitante`, `idEquipoLocal`, `idEquipoVisitante`, `golesLocal`, `golesVisitante`, `fechaCompeticion`, `horaCompeticion`, `habilitado`, `habiliParley`) VALUES
(27, 38, 47, 8, 13, 0, 0, '2021-11-06 00:00:00', '23:15:00', 1, 1),
(28, 38, 47, 8, 13, 0, 0, '2021-10-31 00:00:00', '23:17:00', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallecompentencia`
--

CREATE TABLE `detallecompentencia` (
  `idDetalleCompentencia` int(11) NOT NULL,
  `idCompeticion` int(11) NOT NULL,
  `idEstrategia` int(11) NOT NULL,
  `PorceLocal` int(2) NOT NULL DEFAULT 0,
  `PorceVisitante` int(2) NOT NULL DEFAULT 0,
  `PorceEmpate` int(2) NOT NULL DEFAULT 0,
  `cuotaLocal` varchar(4) DEFAULT '',
  `cuotaVisitante` varchar(4) DEFAULT '',
  `cuotaEmpate` varchar(4) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalleparley`
--

CREATE TABLE `detalleparley` (
  `iddetalleParley` int(11) NOT NULL,
  `idparleys` int(11) NOT NULL,
  `idCompeticiones` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detalleparley`
--

INSERT INTO `detalleparley` (`iddetalleParley`, `idparleys`, `idCompeticiones`) VALUES
(6, 10, 28),
(7, 10, 27);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `idEquipos` int(11) NOT NULL,
  `idLigas` int(11) NOT NULL,
  `nombreEquipo` varchar(255) NOT NULL,
  `habilitado` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`idEquipos`, `idLigas`, `nombreEquipo`, `habilitado`) VALUES
(6, 38, 'Nacional', 1),
(7, 37, 'Barcelona', 1),
(8, 38, 'HuilaActualizado', 1),
(9, 43, 'EquipoArgentino2', 1),
(10, 43, 'EquipoArgentino3', 1),
(11, 43, 'EquipoArgentino4', 1),
(12, 47, 'EquipoColombiana5', 1),
(13, 47, 'EquipoColombiana2', 1),
(14, 47, 'EquipoColombiana3', 1),
(15, 47, 'EquipoColombiana4', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estrategias`
--

CREATE TABLE `estrategias` (
  `idEstrategia` int(11) NOT NULL,
  `nombreEstrategia` varchar(45) NOT NULL,
  `habilitado` varchar(45) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estrategias`
--

INSERT INTO `estrategias` (`idEstrategia`, `nombreEstrategia`, `habilitado`) VALUES
(1, 'Favorito', '1'),
(2, 'Gol Primer Tiempo', '1'),
(3, 'Super Teams', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ligas`
--

CREATE TABLE `ligas` (
  `idLigas` int(11) NOT NULL,
  `codiPais` varchar(6) NOT NULL DEFAULT 'NNN',
  `nombreLiga` varchar(255) NOT NULL DEFAULT 'NNN',
  `habilitada` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ligas`
--

INSERT INTO `ligas` (`idLigas`, `codiPais`, `nombreLiga`, `habilitada`) VALUES
(36, 'AL', 'asd', 1),
(37, 'CO', 'PruebaActualizacion', 1),
(38, 'AF', 'Aguila', 1),
(39, 'AF', 'PruebaActualizar', 1),
(40, 'DZ', 'Prueba3', 1),
(41, 'BR', 'prueba5', 1),
(42, 'AS', 'Prueba6', 1),
(43, 'AR', 'SaoPablo', 1),
(44, 'FR', 'Paris', 1),
(45, 'AO', 'pruebaActualizarDesabilitada', 1),
(46, 'AD', 'prueba8', 1),
(47, 'CO', 'LigaColombiana', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `niveles`
--

CREATE TABLE `niveles` (
  `idniveles` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `habilitado` tinyint(4) NOT NULL DEFAULT 1,
  `dias` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `niveles`
--

INSERT INTO `niveles` (`idniveles`, `nombre`, `descripcion`, `precio`, `habilitado`, `dias`) VALUES
(1, 'Gratis', 'Membresia de prueba gratis', '0', 1, 15),
(2, 'Membresia 1', 'Membresia de 1 meses', '27', 1, 30),
(3, 'Membresia 2', 'Membresia de 3 meses', '69', 1, 91),
(4, 'Membresia 3', 'Membresia de 6 meses', '129', 1, 182),
(5, 'Membresia 4', 'Membresia de 1 año', '150', 1, 365);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paises`
--

CREATE TABLE `paises` (
  `idpaises` int(11) NOT NULL,
  `codiPais` varchar(6) NOT NULL DEFAULT 'NNN',
  `nombrePais` varchar(60) NOT NULL DEFAULT 'NNN',
  `logoPais` varchar(255) NOT NULL DEFAULT '#'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `paises`
--

INSERT INTO `paises` (`idpaises`, `codiPais`, `nombrePais`, `logoPais`) VALUES
(1, 'AF', 'Afghanistan', 'http://localhost:4000/public/image-1632892543573-341380748.png'),
(2, 'AX', 'Åland Islands', 'http://localhost:4000/public/image-1632968899517-800472178.png'),
(3, 'AL', 'Albania', 'http://localhost:4000/public/image-1632892560514-713477505.png'),
(4, 'DZ', 'Algeria', 'https://restcountries.eu/data/dza.svg'),
(5, 'AS', 'American Samoa', 'https://restcountries.eu/data/asm.svg'),
(6, 'AD', 'Andorra', 'https://restcountries.eu/data/and.svg'),
(7, 'AO', 'Angola', 'https://restcountries.eu/data/ago.svg'),
(8, 'AI', 'Anguilla', 'https://restcountries.eu/data/aia.svg'),
(9, 'AQ', 'Antarctica', 'https://restcountries.eu/data/ata.svg'),
(10, 'AG', 'Antigua and Barbuda', 'https://restcountries.eu/data/atg.svg'),
(11, 'AR', 'Argentina', 'https://restcountries.eu/data/arg.svg'),
(12, 'AM', 'Armenia', 'https://restcountries.eu/data/arm.svg'),
(13, 'AW', 'Aruba', 'https://restcountries.eu/data/abw.svg'),
(14, 'AU', 'Australia', 'https://restcountries.eu/data/aus.svg'),
(15, 'AT', 'Austria', 'https://restcountries.eu/data/aut.svg'),
(16, 'AZ', 'Azerbaijan', 'https://restcountries.eu/data/aze.svg'),
(17, 'BS', 'Bahamas', 'https://restcountries.eu/data/bhs.svg'),
(18, 'BH', 'Bahrain', 'https://restcountries.eu/data/bhr.svg'),
(19, 'BD', 'Bangladesh', 'https://restcountries.eu/data/bgd.svg'),
(20, 'BB', 'Barbados', 'https://restcountries.eu/data/brb.svg'),
(21, 'BY', 'Belarus', 'https://restcountries.eu/data/blr.svg'),
(22, 'BE', 'Belgium', 'https://restcountries.eu/data/bel.svg'),
(23, 'BZ', 'Belize', 'https://restcountries.eu/data/blz.svg'),
(24, 'BJ', 'Benin', 'https://restcountries.eu/data/ben.svg'),
(25, 'BM', 'Bermuda', 'https://restcountries.eu/data/bmu.svg'),
(26, 'BT', 'Bhutan', 'https://restcountries.eu/data/btn.svg'),
(27, 'BO', 'Bolivia (Plurinational State of)', 'https://restcountries.eu/data/bol.svg'),
(28, 'BQ', 'Bonaire, Sint Eustatius and Saba', 'https://restcountries.eu/data/bes.svg'),
(29, 'BA', 'Bosnia and Herzegovina', 'https://restcountries.eu/data/bih.svg'),
(30, 'BW', 'Botswana', 'https://restcountries.eu/data/bwa.svg'),
(31, 'BV', 'Bouvet Island', 'https://restcountries.eu/data/bvt.svg'),
(32, 'BR', 'Brazil', 'https://restcountries.eu/data/bra.svg'),
(33, 'IO', 'British Indian Ocean Territory', 'https://restcountries.eu/data/iot.svg'),
(34, 'UM', 'United States Minor Outlying Islands', 'https://restcountries.eu/data/umi.svg'),
(35, 'VG', 'Virgin Islands (British)', 'https://restcountries.eu/data/vgb.svg'),
(36, 'VI', 'Virgin Islands (U.S.)', 'https://restcountries.eu/data/vir.svg'),
(37, 'BN', 'Brunei Darussalam', 'https://restcountries.eu/data/brn.svg'),
(38, 'BG', 'Bulgaria', 'https://restcountries.eu/data/bgr.svg'),
(39, 'BF', 'Burkina Faso', 'https://restcountries.eu/data/bfa.svg'),
(40, 'BI', 'Burundi', 'https://restcountries.eu/data/bdi.svg'),
(41, 'KH', 'Cambodia', 'https://restcountries.eu/data/khm.svg'),
(42, 'CM', 'Cameroon', 'https://restcountries.eu/data/cmr.svg'),
(43, 'CA', 'Canada', 'https://restcountries.eu/data/can.svg'),
(44, 'CV', 'Cabo Verde', 'https://restcountries.eu/data/cpv.svg'),
(45, 'KY', 'Cayman Islands', 'https://restcountries.eu/data/cym.svg'),
(46, 'CF', 'Central African Republic', 'https://restcountries.eu/data/caf.svg'),
(47, 'TD', 'Chad', 'https://restcountries.eu/data/tcd.svg'),
(48, 'CL', 'Chile', 'https://restcountries.eu/data/chl.svg'),
(49, 'CN', 'China', 'https://restcountries.eu/data/chn.svg'),
(50, 'CX', 'Christmas Island', 'https://restcountries.eu/data/cxr.svg'),
(51, 'CC', 'Cocos (Keeling) Islands', 'https://restcountries.eu/data/cck.svg'),
(52, 'CO', 'Colombia', 'http://localhost:4000/public/image-1632800769747-126382822.png'),
(53, 'KM', 'Comoros', 'https://restcountries.eu/data/com.svg'),
(54, 'CG', 'Congo', 'https://restcountries.eu/data/cog.svg'),
(55, 'CD', 'Congo (Democratic Republic of the)', 'https://restcountries.eu/data/cod.svg'),
(56, 'CK', 'Cook Islands', 'https://restcountries.eu/data/cok.svg'),
(57, 'CR', 'Costa Rica', 'https://restcountries.eu/data/cri.svg'),
(58, 'HR', 'Croatia', 'https://restcountries.eu/data/hrv.svg'),
(59, 'CU', 'Cuba', 'https://restcountries.eu/data/cub.svg'),
(60, 'CW', 'Curaçao', 'https://restcountries.eu/data/cuw.svg'),
(61, 'CY', 'Cyprus', 'https://restcountries.eu/data/cyp.svg'),
(62, 'CZ', 'Czech Republic', 'https://restcountries.eu/data/cze.svg'),
(63, 'DK', 'Denmark', 'https://restcountries.eu/data/dnk.svg'),
(64, 'DJ', 'Djibouti', 'https://restcountries.eu/data/dji.svg'),
(65, 'DM', 'Dominica', 'https://restcountries.eu/data/dma.svg'),
(66, 'DO', 'Dominican Republic', 'https://restcountries.eu/data/dom.svg'),
(67, 'EC', 'Ecuador', 'https://restcountries.eu/data/ecu.svg'),
(68, 'EG', 'Egypt', 'https://restcountries.eu/data/egy.svg'),
(69, 'SV', 'El Salvador', 'https://restcountries.eu/data/slv.svg'),
(70, 'GQ', 'Equatorial Guinea', 'https://restcountries.eu/data/gnq.svg'),
(71, 'ER', 'Eritrea', 'https://restcountries.eu/data/eri.svg'),
(72, 'EE', 'Estonia', 'https://restcountries.eu/data/est.svg'),
(73, 'ET', 'Ethiopia', 'https://restcountries.eu/data/eth.svg'),
(74, 'FK', 'Falkland Islands (Malvinas)', 'https://restcountries.eu/data/flk.svg'),
(75, 'FO', 'Faroe Islands', 'https://restcountries.eu/data/fro.svg'),
(76, 'FJ', 'Fiji', 'https://restcountries.eu/data/fji.svg'),
(77, 'FI', 'Finland', 'https://restcountries.eu/data/fin.svg'),
(78, 'FR', 'France', 'https://restcountries.eu/data/fra.svg'),
(79, 'GF', 'French Guiana', 'https://restcountries.eu/data/guf.svg'),
(80, 'PF', 'French Polynesia', 'https://restcountries.eu/data/pyf.svg'),
(81, 'TF', 'French Southern Territories', 'https://restcountries.eu/data/atf.svg'),
(82, 'GA', 'Gabon', 'https://restcountries.eu/data/gab.svg'),
(83, 'GM', 'Gambia', 'https://restcountries.eu/data/gmb.svg'),
(84, 'GE', 'Georgia', 'https://restcountries.eu/data/geo.svg'),
(85, 'DE', 'Germany', 'https://restcountries.eu/data/deu.svg'),
(86, 'GH', 'Ghana', 'https://restcountries.eu/data/gha.svg'),
(87, 'GI', 'Gibraltar', 'https://restcountries.eu/data/gib.svg'),
(88, 'GR', 'Greece', 'https://restcountries.eu/data/grc.svg'),
(89, 'GL', 'Greenland', 'https://restcountries.eu/data/grl.svg'),
(90, 'GD', 'Grenada', 'https://restcountries.eu/data/grd.svg'),
(91, 'GP', 'Guadeloupe', 'https://restcountries.eu/data/glp.svg'),
(92, 'GU', 'Guam', 'https://restcountries.eu/data/gum.svg'),
(93, 'GT', 'Guatemala', 'https://restcountries.eu/data/gtm.svg'),
(94, 'GG', 'Guernsey', 'https://restcountries.eu/data/ggy.svg'),
(95, 'GN', 'Guinea', 'https://restcountries.eu/data/gin.svg'),
(96, 'GW', 'Guinea-Bissau', 'https://restcountries.eu/data/gnb.svg'),
(97, 'GY', 'Guyana', 'https://restcountries.eu/data/guy.svg'),
(98, 'HT', 'Haiti', 'https://restcountries.eu/data/hti.svg'),
(99, 'HM', 'Heard Island and McDonald Islands', 'https://restcountries.eu/data/hmd.svg'),
(100, 'VA', 'Holy See', 'https://restcountries.eu/data/vat.svg'),
(101, 'HN', 'Honduras', 'https://restcountries.eu/data/hnd.svg'),
(102, 'HK', 'Hong Kong', 'https://restcountries.eu/data/hkg.svg'),
(103, 'HU', 'Hungary', 'https://restcountries.eu/data/hun.svg'),
(104, 'IS', 'Iceland', 'https://restcountries.eu/data/isl.svg'),
(105, 'IN', 'India', 'https://restcountries.eu/data/ind.svg'),
(106, 'ID', 'Indonesia', 'https://restcountries.eu/data/idn.svg'),
(107, 'IR', 'Iran (Islamic Republic of)', 'https://restcountries.eu/data/irn.svg'),
(108, 'IQ', 'Iraq', 'https://restcountries.eu/data/irq.svg'),
(109, 'IE', 'Ireland', 'https://restcountries.eu/data/irl.svg'),
(110, 'IM', 'Isle of Man', 'https://restcountries.eu/data/imn.svg'),
(111, 'IL', 'Israel', 'https://restcountries.eu/data/isr.svg'),
(112, 'IT', 'Italy', 'https://restcountries.eu/data/ita.svg'),
(113, 'JM', 'Jamaica', 'https://restcountries.eu/data/jam.svg'),
(114, 'JP', 'Japan', 'https://restcountries.eu/data/jpn.svg'),
(115, 'JE', 'Jersey', 'https://restcountries.eu/data/jey.svg'),
(116, 'JO', 'Jordan', 'https://restcountries.eu/data/jor.svg'),
(117, 'KZ', 'Kazakhstan', 'https://restcountries.eu/data/kaz.svg'),
(118, 'KE', 'Kenya', 'https://restcountries.eu/data/ken.svg'),
(119, 'KI', 'Kiribati', 'https://restcountries.eu/data/kir.svg'),
(120, 'KW', 'Kuwait', 'https://restcountries.eu/data/kwt.svg'),
(121, 'KG', 'Kyrgyzstan', 'https://restcountries.eu/data/kgz.svg'),
(122, 'LV', 'Latvia', 'https://restcountries.eu/data/lva.svg'),
(123, 'LB', 'Lebanon', 'https://restcountries.eu/data/lbn.svg'),
(124, 'LS', 'Lesotho', 'https://restcountries.eu/data/lso.svg'),
(125, 'LR', 'Liberia', 'https://restcountries.eu/data/lbr.svg'),
(126, 'LY', 'Libya', 'https://restcountries.eu/data/lby.svg'),
(127, 'LI', 'Liechtenstein', 'https://restcountries.eu/data/lie.svg'),
(128, 'LT', 'Lithuania', 'https://restcountries.eu/data/ltu.svg'),
(129, 'LU', 'Luxembourg', 'https://restcountries.eu/data/lux.svg'),
(130, 'MO', 'Macao', 'https://restcountries.eu/data/mac.svg'),
(131, 'MK', 'Macedonia (the former Yugoslav Republic of)', 'https://restcountries.eu/data/mkd.svg'),
(132, 'MG', 'Madagascar', 'https://restcountries.eu/data/mdg.svg'),
(133, 'MW', 'Malawi', 'https://restcountries.eu/data/mwi.svg'),
(134, 'MY', 'Malaysia', 'https://restcountries.eu/data/mys.svg'),
(135, 'MV', 'Maldives', 'https://restcountries.eu/data/mdv.svg'),
(136, 'ML', 'Mali', 'https://restcountries.eu/data/mli.svg'),
(137, 'MT', 'Malta', 'https://restcountries.eu/data/mlt.svg'),
(138, 'MH', 'Marshall Islands', 'https://restcountries.eu/data/mhl.svg'),
(139, 'MQ', 'Martinique', 'https://restcountries.eu/data/mtq.svg'),
(140, 'MR', 'Mauritania', 'https://restcountries.eu/data/mrt.svg'),
(141, 'MU', 'Mauritius', 'https://restcountries.eu/data/mus.svg'),
(142, 'YT', 'Mayotte', 'https://restcountries.eu/data/myt.svg'),
(143, 'MX', 'Mexico', 'https://restcountries.eu/data/mex.svg'),
(144, 'FM', 'Micronesia (Federated States of)', 'https://restcountries.eu/data/fsm.svg'),
(145, 'MD', 'Moldova (Republic of)', 'https://restcountries.eu/data/mda.svg'),
(146, 'MC', 'Monaco', 'https://restcountries.eu/data/mco.svg'),
(147, 'MN', 'Mongolia', 'https://restcountries.eu/data/mng.svg'),
(148, 'ME', 'Montenegro', 'https://restcountries.eu/data/mne.svg'),
(149, 'MS', 'Montserrat', 'https://restcountries.eu/data/msr.svg'),
(150, 'MA', 'Morocco', 'https://restcountries.eu/data/mar.svg'),
(151, 'MZ', 'Mozambique', 'https://restcountries.eu/data/moz.svg'),
(152, 'MM', 'Myanmar', 'https://restcountries.eu/data/mmr.svg'),
(153, 'NA', 'Namibia', 'https://restcountries.eu/data/nam.svg'),
(154, 'NR', 'Nauru', 'https://restcountries.eu/data/nru.svg'),
(155, 'NP', 'Nepal', 'https://restcountries.eu/data/npl.svg'),
(156, 'NL', 'Netherlands', 'https://restcountries.eu/data/nld.svg'),
(157, 'NC', 'New Caledonia', 'https://restcountries.eu/data/ncl.svg'),
(158, 'NZ', 'New Zealand', 'https://restcountries.eu/data/nzl.svg'),
(159, 'NI', 'Nicaragua', 'https://restcountries.eu/data/nic.svg'),
(160, 'NE', 'Niger', 'https://restcountries.eu/data/ner.svg'),
(161, 'NG', 'Nigeria', 'https://restcountries.eu/data/nga.svg'),
(162, 'NU', 'Niue', 'https://restcountries.eu/data/niu.svg'),
(163, 'NF', 'Norfolk Island', 'https://restcountries.eu/data/nfk.svg'),
(164, 'MP', 'Northern Mariana Islands', 'https://restcountries.eu/data/mnp.svg'),
(165, 'NO', 'Norway', 'https://restcountries.eu/data/nor.svg'),
(166, 'OM', 'Oman', 'https://restcountries.eu/data/omn.svg'),
(167, 'PK', 'Pakistan', 'https://restcountries.eu/data/pak.svg'),
(168, 'PW', 'Palau', 'https://restcountries.eu/data/plw.svg'),
(169, 'PS', 'Palestine, State of', 'https://restcountries.eu/data/pse.svg'),
(170, 'PA', 'Panama', 'https://restcountries.eu/data/pan.svg'),
(171, 'PG', 'Papua New Guinea', 'https://restcountries.eu/data/png.svg'),
(172, 'PY', 'Paraguay', 'https://restcountries.eu/data/pry.svg'),
(173, 'PE', 'Peru', 'https://restcountries.eu/data/per.svg'),
(174, 'PH', 'Philippines', 'https://restcountries.eu/data/phl.svg'),
(175, 'PN', 'Pitcairn', 'https://restcountries.eu/data/pcn.svg'),
(176, 'PL', 'Poland', 'https://restcountries.eu/data/pol.svg'),
(177, 'PT', 'Portugal', 'https://restcountries.eu/data/prt.svg'),
(178, 'PR', 'Puerto Rico', 'https://restcountries.eu/data/pri.svg'),
(179, 'QA', 'Qatar', 'https://restcountries.eu/data/qat.svg'),
(180, 'XK', 'Republic of Kosovo', 'https://restcountries.eu/data/kos.svg'),
(181, 'RE', 'Réunion', 'https://restcountries.eu/data/reu.svg'),
(182, 'RO', 'Romania', 'https://restcountries.eu/data/rou.svg'),
(183, 'RU', 'Russian Federation', 'https://restcountries.eu/data/rus.svg'),
(184, 'RW', 'Rwanda', 'https://restcountries.eu/data/rwa.svg'),
(185, 'BL', 'Saint Barthélemy', 'https://restcountries.eu/data/blm.svg'),
(186, 'SH', 'Saint Helena, Ascension and Tristan da Cunha', 'https://restcountries.eu/data/shn.svg'),
(187, 'KN', 'Saint Kitts and Nevis', 'https://restcountries.eu/data/kna.svg'),
(188, 'LC', 'Saint Lucia', 'https://restcountries.eu/data/lca.svg'),
(189, 'MF', 'Saint Martin (French part)', 'https://restcountries.eu/data/maf.svg'),
(190, 'PM', 'Saint Pierre and Miquelon', 'https://restcountries.eu/data/spm.svg'),
(191, 'VC', 'Saint Vincent and the Grenadines', 'https://restcountries.eu/data/vct.svg'),
(192, 'WS', 'Samoa', 'https://restcountries.eu/data/wsm.svg'),
(193, 'SM', 'San Marino', 'https://restcountries.eu/data/smr.svg'),
(194, 'ST', 'Sao Tome and Principe', 'https://restcountries.eu/data/stp.svg'),
(195, 'SA', 'Saudi Arabia', 'https://restcountries.eu/data/sau.svg'),
(196, 'SN', 'Senegal', 'https://restcountries.eu/data/sen.svg'),
(197, 'RS', 'Serbia', 'https://restcountries.eu/data/srb.svg'),
(198, 'SC', 'Seychelles', 'https://restcountries.eu/data/syc.svg'),
(199, 'SL', 'Sierra Leone', 'https://restcountries.eu/data/sle.svg'),
(200, 'SG', 'Singapore', 'https://restcountries.eu/data/sgp.svg'),
(201, 'SX', 'Sint Maarten (Dutch part)', 'https://restcountries.eu/data/sxm.svg'),
(202, 'SK', 'Slovakia', 'https://restcountries.eu/data/svk.svg'),
(203, 'SI', 'Slovenia', 'https://restcountries.eu/data/svn.svg'),
(204, 'SB', 'Solomon Islands', 'https://restcountries.eu/data/slb.svg'),
(205, 'SO', 'Somalia', 'https://restcountries.eu/data/som.svg'),
(206, 'ZA', 'South Africa', 'https://restcountries.eu/data/zaf.svg'),
(207, 'GS', 'South Georgia and the South Sandwich Islands', 'https://restcountries.eu/data/sgs.svg'),
(208, 'KR', 'Korea (Republic of)', 'https://restcountries.eu/data/kor.svg'),
(209, 'SS', 'South Sudan', 'https://restcountries.eu/data/ssd.svg'),
(210, 'ES', 'Spain', 'https://restcountries.eu/data/esp.svg'),
(211, 'LK', 'Sri Lanka', 'https://restcountries.eu/data/lka.svg'),
(212, 'SD', 'Sudan', 'https://restcountries.eu/data/sdn.svg'),
(213, 'SR', 'Suriname', 'https://restcountries.eu/data/sur.svg'),
(214, 'SJ', 'Svalbard and Jan Mayen', 'https://restcountries.eu/data/sjm.svg'),
(215, 'SZ', 'Swaziland', 'https://restcountries.eu/data/swz.svg'),
(216, 'SE', 'Sweden', 'https://restcountries.eu/data/swe.svg'),
(217, 'CH', 'Switzerland', 'https://restcountries.eu/data/che.svg'),
(218, 'SY', 'Syrian Arab Republic', 'https://restcountries.eu/data/syr.svg'),
(219, 'TW', 'Taiwan', 'https://restcountries.eu/data/twn.svg'),
(220, 'TJ', 'Tajikistan', 'https://restcountries.eu/data/tjk.svg'),
(221, 'TZ', 'Tanzania, United Republic of', 'https://restcountries.eu/data/tza.svg'),
(222, 'TH', 'Thailand', 'https://restcountries.eu/data/tha.svg'),
(223, 'TL', 'Timor-Leste', 'https://restcountries.eu/data/tls.svg'),
(224, 'TG', 'Togo', 'https://restcountries.eu/data/tgo.svg'),
(225, 'TK', 'Tokelau', 'https://restcountries.eu/data/tkl.svg'),
(226, 'TO', 'Tonga', 'https://restcountries.eu/data/ton.svg'),
(227, 'TT', 'Trinidad and Tobago', 'https://restcountries.eu/data/tto.svg'),
(228, 'TN', 'Tunisia', 'https://restcountries.eu/data/tun.svg'),
(229, 'TR', 'Turkey', 'https://restcountries.eu/data/tur.svg'),
(230, 'TM', 'Turkmenistan', 'https://restcountries.eu/data/tkm.svg'),
(231, 'TC', 'Turks and Caicos Islands', 'https://restcountries.eu/data/tca.svg'),
(232, 'TV', 'Tuvalu', 'https://restcountries.eu/data/tuv.svg'),
(233, 'UG', 'Uganda', 'https://restcountries.eu/data/uga.svg'),
(234, 'UA', 'Ukraine', 'https://restcountries.eu/data/ukr.svg'),
(235, 'AE', 'United Arab Emirates', 'https://restcountries.eu/data/are.svg'),
(236, 'GB', 'United Kingdom of Great Britain and Northern Ireland', 'https://restcountries.eu/data/gbr.svg'),
(237, 'US', 'United States of America', 'https://restcountries.eu/data/usa.svg'),
(238, 'UY', 'Uruguay', 'https://restcountries.eu/data/ury.svg'),
(239, 'UZ', 'Uzbekistan', 'https://restcountries.eu/data/uzb.svg'),
(240, 'VU', 'Vanuatu', 'https://restcountries.eu/data/vut.svg'),
(241, 'VE', 'Venezuela (Bolivarian Republic of)', 'https://restcountries.eu/data/ven.svg'),
(242, 'VN', 'Viet Nam', 'https://restcountries.eu/data/vnm.svg'),
(243, 'WF', 'Wallis and Futuna', 'https://restcountries.eu/data/wlf.svg'),
(244, 'EH', 'Western Sahara', 'https://restcountries.eu/data/esh.svg'),
(245, 'YE', 'Yemen', 'https://restcountries.eu/data/yem.svg'),
(246, 'ZM', 'Zambia', 'https://restcountries.eu/data/zmb.svg'),
(247, 'ZW', 'Zimbabwe', 'https://restcountries.eu/data/zwe.svg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parleys`
--

CREATE TABLE `parleys` (
  `idparleys` int(11) NOT NULL,
  `cuotaTotal` varchar(4) NOT NULL DEFAULT '0',
  `fechaIngreso` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `parleys`
--

INSERT INTO `parleys` (`idparleys`, `cuotaTotal`, `fechaIngreso`) VALUES
(10, '60', '2021-10-21 00:04:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idRol` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idRol`, `Nombre`) VALUES
(1, 'usuario'),
(2, 'superusuario'),
(3, 'administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuarios` int(11) NOT NULL,
  `idRol` int(11) NOT NULL,
  `codiPais` varchar(10) NOT NULL DEFAULT 'CO',
  `nombre` varchar(45) DEFAULT NULL,
  `apellidos` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(72) NOT NULL,
  `genero` varchar(9) DEFAULT NULL,
  `celular` varchar(12) DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `fechaIngreso` datetime NOT NULL DEFAULT current_timestamp(),
  `habilitado` tinyint(4) NOT NULL DEFAULT 1,
  `nivel` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuarios`, `idRol`, `codiPais`, `nombre`, `apellidos`, `email`, `password`, `genero`, `celular`, `usuario`, `fechaIngreso`, `habilitado`, `nivel`) VALUES
(1, 3, 'CO', 'Juan Diego', 'Pimentel Tenjo', 'tenjo2001@gmail.com', '$2b$08$6IfUh229waJtiqKnW9p1NegJLr6GGMcH.aBQnR5.ArmBT46p3H64i', 'Masculino', '3144147105', 'JuanTenjo', '2021-08-18 19:13:04', 1, 1),
(2, 1, 'AX', 'Juan Diego', 'Pimentel', 'tenjddo2001@gmail.com', '$2b$08$F1YRNYdP1r.dI1kKTnkSJODbOAITjlz8fDt4NRsWN2Nj5fEDuhmx2', 'Masculino', '3204519083', NULL, '2021-08-18 19:13:04', 1, 1),
(3, 1, 'AX', 'asdasdP', 'Prueas', 'tenjddof2001@gmail.com', '$2b$08$3GxIa6yppJ3QCA0e80MBuOyBHEgSHdu5PeFltT/CvGZ1Y2uQwZ.oK', 'Femenino', '3144147105', NULL, '2021-08-18 19:13:04', 0, 1),
(4, 1, 'AX', 'asdasdP', 'Prueas', 'pruebaActualizacion@gmail.com', '$2b$08$1P9lkrkeIqsWJ28GzLmYYOomAe96n9OkRru7l9Wy961sVmPVWTJuS', 'Femenino', '3144147105', NULL, '2021-08-18 19:13:04', 0, 1),
(5, 1, 'AX', 'asdasdP', 'Prueas', 'teasdnjddof2002@gmail.com', '$2b$08$QySRzYVBhCacOg7nborc8elu7SeZDnYjDypo7QNDgIJZVtePIL5hq', 'Femenino', '3144147105', NULL, '2021-08-18 19:13:04', 0, 1),
(6, 1, 'AX', 'asdasdP', 'Prueas', 'tenjo002@gmail.com', '$2b$08$zheraxk8ev3Vl95HLd2M6eR.V9NRy58utkGOJy4PyztUWJrZdl4xy', 'Femenino', '3144147105', NULL, '2021-08-18 19:13:04', 0, 1),
(7, 1, 'AX', 'asdasdP', 'Prueas', 'tenjo0sdfsdf02@gmail.com', '$2b$08$4wR7uEybXThjxL9RXVXiS.wNZWYmf158DbPC3tWZVbRgkMNHigedG', 'Femenino', '3144147105', NULL, '2021-08-18 19:13:04', 0, 1),
(9, 1, 'AR', 'Valentina', 'Pimentel Patino', 'paulaap.123@hotmail.com', '$2b$10$vuSq8FvbANzMMc/YBmpUDuWbM7i1ZmHRkbQeJWUMJ0w3L0zkCeGi6', 'Masculino', '3144147105', NULL, '2021-09-13 23:59:55', 0, 1),
(10, 1, 'CO', 'Juan', 'Tenjo', 'sigloxxistore@gmail.com', '$2b$10$uNVpTxrnI3nh2PD8um0QdOTZ7LwaGGvX3/S46MZjwzGFZIlahb2nm', 'Masculino', '3144147105', NULL, '2021-09-21 21:03:02', 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `competencias`
--
ALTER TABLE `competencias`
  ADD PRIMARY KEY (`idCompeticiones`),
  ADD KEY `EquipoLoca` (`idEquipoLocal`),
  ADD KEY `Liga2` (`idEquipoVisitante`),
  ADD KEY `LigaLoca` (`idLigaLocal`),
  ADD KEY `LigaVisitante` (`idLigaVisitante`);

--
-- Indices de la tabla `detallecompentencia`
--
ALTER TABLE `detallecompentencia`
  ADD PRIMARY KEY (`idDetalleCompentencia`),
  ADD KEY `Estrategia` (`idEstrategia`),
  ADD KEY `Competicion` (`idCompeticion`);

--
-- Indices de la tabla `detalleparley`
--
ALTER TABLE `detalleparley`
  ADD PRIMARY KEY (`iddetalleParley`),
  ADD KEY `idParley` (`idparleys`),
  ADD KEY `idCompetencia` (`idCompeticiones`);

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`idEquipos`),
  ADD KEY `idLigas` (`idLigas`);

--
-- Indices de la tabla `estrategias`
--
ALTER TABLE `estrategias`
  ADD PRIMARY KEY (`idEstrategia`);

--
-- Indices de la tabla `ligas`
--
ALTER TABLE `ligas`
  ADD PRIMARY KEY (`idLigas`);

--
-- Indices de la tabla `niveles`
--
ALTER TABLE `niveles`
  ADD PRIMARY KEY (`idniveles`);

--
-- Indices de la tabla `paises`
--
ALTER TABLE `paises`
  ADD PRIMARY KEY (`idpaises`,`codiPais`);

--
-- Indices de la tabla `parleys`
--
ALTER TABLE `parleys`
  ADD PRIMARY KEY (`idparleys`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuarios`,`idRol`,`codiPais`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `competencias`
--
ALTER TABLE `competencias`
  MODIFY `idCompeticiones` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `detallecompentencia`
--
ALTER TABLE `detallecompentencia`
  MODIFY `idDetalleCompentencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT de la tabla `detalleparley`
--
ALTER TABLE `detalleparley`
  MODIFY `iddetalleParley` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `idEquipos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `estrategias`
--
ALTER TABLE `estrategias`
  MODIFY `idEstrategia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ligas`
--
ALTER TABLE `ligas`
  MODIFY `idLigas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `paises`
--
ALTER TABLE `paises`
  MODIFY `idpaises` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=250;

--
-- AUTO_INCREMENT de la tabla `parleys`
--
ALTER TABLE `parleys`
  MODIFY `idparleys` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `competencias`
--
ALTER TABLE `competencias`
  ADD CONSTRAINT `EquipoLoca` FOREIGN KEY (`idEquipoLocal`) REFERENCES `equipos` (`idEquipos`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `EquipoVisitante` FOREIGN KEY (`idEquipoVisitante`) REFERENCES `equipos` (`idEquipos`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `LigaLoca` FOREIGN KEY (`idLigaLocal`) REFERENCES `ligas` (`idLigas`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `LigaVisitante` FOREIGN KEY (`idLigaVisitante`) REFERENCES `ligas` (`idLigas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detallecompentencia`
--
ALTER TABLE `detallecompentencia`
  ADD CONSTRAINT `Competicion` FOREIGN KEY (`idCompeticion`) REFERENCES `competencias` (`idCompeticiones`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Estrategia` FOREIGN KEY (`idEstrategia`) REFERENCES `estrategias` (`idEstrategia`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalleparley`
--
ALTER TABLE `detalleparley`
  ADD CONSTRAINT `idCompetencia` FOREIGN KEY (`idCompeticiones`) REFERENCES `competencias` (`idCompeticiones`),
  ADD CONSTRAINT `idParley` FOREIGN KEY (`idparleys`) REFERENCES `parleys` (`idparleys`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD CONSTRAINT `idLigas` FOREIGN KEY (`idLigas`) REFERENCES `ligas` (`idLigas`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
