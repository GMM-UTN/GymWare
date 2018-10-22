using GymWare.DataAccess.DAL;
using GymWare.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GymWare.Entities.DTO;

namespace GymWare.Logic
{
    public class UsuarioLogic
    {
        private UsuarioRepository _us = new UsuarioRepository();
        private DietaRepository _di = new DietaRepository();
        private RutinaRepository _ru = new RutinaRepository();
        private DietaComidaLogic _dc = new DietaComidaLogic();
        private RutinaEjercicioLogic _re = new RutinaEjercicioLogic();

        public List<Cliente> GetAll()
        {
            return _us.GetAll();
        }

        public UsuarioLogeadoDTO CheckUsuario(UsuarioLoginDTO usuarioLoginDTO)
        {
            UsuarioLogeadoDTO usuarioLogeado = new UsuarioLogeadoDTO();
            Cliente cliente = _us.CheckCliente(usuarioLoginDTO);
            if (cliente != null)
            {
                List<Dieta> dietas = _di.GetAllDietasByUser(cliente.ClienteId);
                usuarioLogeado.DietasComidas = new List<DietaComida>();
                foreach (var d in dietas)
                {
                    List<DietaComida> dc = _dc.GetDietaConComidas(d.DietaId);
                    foreach (var dc1 in dc)
                    {
                        usuarioLogeado.DietasComidas.Add(dc1);
                    }                    
                }
                List<Rutina> rutinas = _ru.GetAllRutinasByUser(cliente.ClienteId);
                usuarioLogeado.RutinasEjercicios = new List<RutinaEjercicio>();
                foreach (var r in rutinas)
                {
                    List<RutinaEjercicio> re = _re.GetRutinaConEjercicios(r.RutinaId);
                    foreach (var re1 in re)
                    {
                        usuarioLogeado.RutinasEjercicios.Add(re1);
                    }
                }
                usuarioLogeado.Cliente = cliente;
                usuarioLogeado.Mensaje = "Cliente logueado correctamente";
                return usuarioLogeado;
            }
            else
            {
                
                usuarioLogeado.Empleado = _us.CheckEmpleado(usuarioLoginDTO);
                if (usuarioLogeado.Empleado != null)
                {
                    usuarioLogeado.Mensaje = "Empleado logueado correctamente";
                    return usuarioLogeado;
                }
                else
                {
                    usuarioLogeado.Mensaje = "Error al intentar loguear";
                    return usuarioLogeado;
                }
            }
        }
        //public UsuarioLogeadoDTO CheckUsuario(UsuarioLoginDTO usuarioLoginDTO)
        //{
        //    UsuarioLogeadoDTO usuarioLogeado = new UsuarioLogeadoDTO();
        //    usuarioLogeado.Cliente = _us.CheckCliente(usuarioLoginDTO);
        //    if (usuarioLogeado.Cliente != null)
        //    {
        //        usuarioLogeado.Dietas = _di.GetAllDietasByUser(usuarioLogeado.Cliente.ClienteId);
        //        usuarioLogeado.Rutinas = _ru.GetAllRutinasByUser(usuarioLogeado.Cliente.ClienteId);
        //        return usuarioLogeado;
        //    }
        //    else
        //    {                
        //        usuarioLogeado.Empleado = _us.CheckEmpleado(usuarioLoginDTO);
        //        if (usuarioLogeado.Empleado != null)
        //        {
        //            return usuarioLogeado;
        //        }
        //        else
        //        {
        //            return null;
        //        }
        //    }
        //}
        public bool Insert(Cliente cliente)
        {
            return _us.Insert(cliente);
        }
    }
}
