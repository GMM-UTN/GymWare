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

        public List<Cliente> GetAll()
        {
            return _us.GetAll();
        }

        public UsuarioLogeadoDTO CheckUsuario(UsuarioLoginDTO usuarioLoginDTO)
        {
            UsuarioLogeadoDTO usuarioLogeado = new UsuarioLogeadoDTO();
            usuarioLogeado.Cliente = _us.CheckCliente(usuarioLoginDTO);
            if (usuarioLogeado.Cliente != null)
            {
                usuarioLogeado.Dietas = _di.GetAllDietasByUser(usuarioLogeado.Cliente.ClienteId);
                usuarioLogeado.Rutinas = _ru.GetAllRutinasByUser(usuarioLogeado.Cliente.ClienteId);
                return usuarioLogeado;
            }
            else
            {                
                usuarioLogeado.Empleado = _us.CheckEmpleado(usuarioLoginDTO);
                if (usuarioLogeado.Empleado != null)
                {
                    return usuarioLogeado;
                }
                else
                {
                    return null;
                }
            }
        }
        public bool Insert(Cliente cliente)
        {
            return _us.Insert(cliente);
        }
    }
}
